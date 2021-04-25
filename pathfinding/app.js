function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1)
    }
  }
}

function heuristic(a, b) {
  return dist(a.x, a.y, b.x, b.y)
  // return abs(a.x - b.x) + abs(a.y, b.y)
  // return random(1) < 0.9 ? dist(a.x, a.y, b.x, b.y) : abs(a.x - b.x) + abs(a.y, b.y)
}

const cols = 80
const rows = 50
const grid = new Array(cols)

const openSet = []
const closeSet = []
let start
let end
let w, h
let foundSolution = false

class Spot {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.f = 0
    this.g = 0
    this.h = 0
    this.cameFrom = undefined
    this.wall = random(1) < 0.1
    this.neighbors = function() {
      let temp = []
      if (this.x > 0) {
        temp.push(grid[this.x - 1][this.y])
      }
      if (this.y > 0) {
        temp.push(grid[this.x][this.y - 1])
      }
      if (this.x < cols - 1) {
        temp.push(grid[this.x + 1][this.y])
      }
      if (this.y < rows - 1) {
        temp.push(grid[this.x][this.y + 1])
      }
      if (this.x > 0 && this.y > 0) {
        temp.push(grid[this.x - 1][this.y - 1])
      }
      if (this.x < cols - 1 && this.y < rows - 1) {
        temp.push(grid[this.x + 1][this.y + 1])
      }
      return temp
    }
    
    this.show = function(fill_color) {
      noStroke()
      if (this.wall) {
        fill(0)
        ellipse(this.x * w + w/2, this.y * h + h/2, w, h)
      } else {
        fill(fill_color)
        rect(this.x * w, this.y * h, w, h)
      }
    }
  }
}

function setup() {
  createCanvas(800, 500)
  console.log('A* Pathfinding Algorithm')

  w = width / cols
  h = height / rows

  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows)
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j)
    }
  }

  // 入り口と出口を設定
  start = grid[0][0]
  end = grid[cols-1][rows-1]
  // end = grid[int(random(cols-1))][int(random(rows-1))]

  // 特別な壁を作る
  const halfCols = int(cols/2)
  const halfRows = int(rows/2)
  for(let i = int(halfCols/2); i < int(halfCols*3/2); i++) {
    for(let j = int(halfRows/2); j < int(halfRows*3/2); j++) {
      if (i + j == halfCols + halfRows || i + j == halfCols + halfRows + 1) {
        grid[i][j].wall = true
        console.log(i, j)
      }
    }
  }
  start.wall = false
  end.wall = false
  start.neighbors().forEach( neighbor => neighbor.wall = false )
  end.neighbors().forEach( neighbor => neighbor.wall = false )

  openSet.push(start)

  console.log(grid)
}

function draw() {
  background(255)

  let current = undefined

  // finding path
  if (openSet.length > 0) {
    let winner = 0
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i
      }
    }
    current = openSet[winner]

    if (current === end) {
      console.log("DONE!")
      foundSolution = true
      noLoop()
    }
    
    removeFromArray(openSet, current)
    closeSet.push(current)

    let neighbors = current.neighbors()
    neighbors.forEach(function (neighbor) {
      if (!closeSet.includes(neighbor) && !neighbor.wall) {
        // g score
        let tempG = current.g + 1
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g =  tempG
            neighbor.cameFrom = current
          }
        } else {
          neighbor.g = tempG
          neighbor.cameFrom = current
        }

        // h score
        neighbor.h = heuristic(neighbor, end)

        // f score
        neighbor.f = neighbor.g + neighbor.h

        openSet.push(neighbor)
      }
    })

  } else {
    console.log("No solution")
    noLoop();
  }

  // display
  // wall and backgrounds
  for (let i = 0; i < cols; i++ ) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].show(color(255))
    }
  }

  for (let i = 0; i < closeSet.length; i++ ) {
    closeSet[i].show(color(255,192,203))
  }

  for (let i = 0; i < openSet.length; i++ ) {
    openSet[i].show(color(150, 255, 150))
  }

  let path = [current];
  let previous = current;
  while(previous.cameFrom) {
    path.push(previous.cameFrom)
    previous = previous.cameFrom
  }
  // path.forEach( function (spot) {
  //   spot.show(color(255,105,180))
  // })

  start.show(color(255,0,0))
  end.show(color(255,0,0))
  
  // 経路を線で表す
  noFill()
  stroke(color(255,20,147))
  strokeWeight(w/2)
  beginShape()
  path.forEach( function(spot) {
    vertex(spot.x * w + w/2, spot.y * h + h/2)
  })
  endShape()
}
