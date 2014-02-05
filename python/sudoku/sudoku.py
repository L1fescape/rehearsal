import os


# read in a puzzle from a text file
f = open('puzzle.txt')
a = []
c = 0
for c in range(9):
  a.append([])
c = 0
for line in f:
    for col in line:
        if (col != "\n"):
            a[c].append(int(col))
    c+=1
f.close()


def printPuz(d):
  for row in d:
    line = ""
    for col in d:
      line += str(col) + "\n"
  print str(line)

def checkRow(d, row, col, num):
  for c in range(9):
    if (col != c and num == d[row][c]):
      return False
  return True

def checkCol(d, row, col, num):
  for r in range(9):
    if (row != r and num == d[r][col]):
      return False
  return True

def checkSquare(d, row, col, num):
  if (row < 3): 
    rstart = 0
  elif (row < 6): 
    rstart = 3
  else: 
    rstart = 6

  if (col < 3): 
    cstart = 0
  elif (col < 6):
    cstart = 3
  else:
    cstart = 6

  for r in range(3):
    for c in range(3):
      if (num == d[r+rstart][c+cstart]):
        return False
  return True

def check(d, row, col, num):
  return checkRow(d, row, col, num) and checkCol(d, row, col, num) and checkSquare(d, row, col, num)

def findNext(row, col):
  r = row
  c = col
  while (r < 9):
    while (c < 9):
      if (b[r][c] == 0):
        return r, c
      c+=1
    c = 0
    r+=1
  solved = True
  printPuz(b)
  return row, col

def solve(row, col):
  fnext = findNext(row, col)
  nrow = fnext[0]
  ncol = fnext[1]
  for x in range(1, 10):
    if check(b, nrow, ncol, x) and not solved:
      b[nrow][ncol] = x
      solve(nrow, ncol)
  b[nrow][ncol] = 0

global b
b = a # copy puzzle
global solved
solved = False
solve(0, 0)
