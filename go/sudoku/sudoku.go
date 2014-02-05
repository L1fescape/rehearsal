package main

import (
  "strconv"
  "bufio"
  "fmt"
  "log"
  "os"
)

// helper functions
/*
func clone(a [][]int) [][]int {
  x := make([][]int, len(a[0]))
  for i := range a[0] {
    x[i] = make([]int, len(a[i]))
    for j := 0; j < len(a[i]); j++ {
      x[i][j] = a[i][j]
    }
  }
  return x
}
*/

// readLines reads a whole file into memory
// and returns a slice of its lines.
func readLines(path string) ([]string, error) {
  file, err := os.Open(path)
  if err != nil {
    return nil, err
  }
  defer file.Close()

  var lines []string
  scanner := bufio.NewScanner(file)
  for scanner.Scan() {
    lines = append(lines, scanner.Text())
  }
  return lines, scanner.Err()
}

func printPuzzle( a [][]int) {
  for i := 0; i < len(a); i++ {
    fmt.Println(a[i]);
  }
}



var solved bool


func checkRow(r int, c int, a [][]int, num int) (bool) {
  for i := 0; i < 9; i++ {
    if i != c && num == a[r][i] {
      return false
    }
  }
  return true
}

func checkCol(r int, c int, a [][]int, num int) bool {
  for i := 0; i < 9; i++ {
    if i != r && num == a[i][c] {
      return false
    }
  }
  return true
}

func checkSquare(r int, c int, a [][]int, num int) bool {
  rstart := 0
  cstart := 0
  if r < 3 {
    rstart = 0
  } else if r < 6 {
    rstart = 3
  } else {
    rstart = 6
  }

  if c < 3 {
    cstart = 0
  } else if c < 6 {
    cstart = 3
  } else { 
    cstart = 6
  }

  for i := 0; i < 3; i++ {
    for j := 0; j < 3; j++ {
      if num == a[i+rstart][j+cstart] {
        return false
      }
    }
  }
  return true
}


func check(r int, c int, a [][]int, num int) bool {
  return checkRow(r, c, a, num) && checkCol(r, c, a, num) && checkSquare(r, c, a, num)
}

func findNext(r int, c int, a [][]int) (int, int) {
  origR := r
  origC := c
  for ; r < 9; r++ {
    for ; c < 9; c++ {
      if a[r][c] == 0 && (r != origR || c != origC) {
        return r, c
      }
    }
    c = 0
  }
  solved = true
  printPuzzle(a)
  return -1, -1
}

func solve(r int, c int, a [][]int) ([][]int) {
  nrow, ncol := findNext(r, c, a)
  if nrow == -1 {
    return a
  }
  for i := 1; i < 10; i++ {
    if check(nrow, ncol, a, i) && !solved {
      a[nrow][ncol] = i
      a = solve(nrow, ncol, a)
    }
  }
  a[nrow][ncol] = 0
  return a
}

func main() {
  row := 9
  col := 9
  // allocate composed 2d array
  a := make([][]int, row)
  for i := range a {
    a[i] = make([]int, col)
  }

  // read whole the file
  lines, err := readLines("puzzle.txt")
  if err != nil {
    log.Fatalf("readLines: %s", err)
  }

  for r := range lines {
    for c, v := range lines[r] {
      n, err := strconv.Atoi(string(v))
      if err != nil { panic(err) }
      a[r][c] = n
    }
  }

  solved = false
  a = solve(0, 0, a)
}
