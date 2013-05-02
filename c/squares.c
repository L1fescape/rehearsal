#include <stdio.h>      /* printf, scanf, NULL */
#include <stdlib.h>     /* malloc, free, rand */

long *squares(long n) {
	long *sq = malloc(sizeof(long) * n);
	long i = 0;
	for (i = 0; i < n; i++){
		sq[i] = i*i;
	}
	return sq;
}

int main() {
	long *sq = squares(2L);
	printf("%lu", sq[2L]);
	return 0;
}
