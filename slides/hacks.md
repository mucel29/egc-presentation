# Magie Neagră (Hacks)

Când matematica e prea lentă, trișăm.

---

## Fast Inverse Square Root (Quake III)

Calcularea `1 / sqrt(x)` e vitală pentru normalizarea vectorilor.
Procesorul o face lent. John Carmack (sau Terje Mathisen) a făcut asta:

```c
float Q_rsqrt( float number ) {
	long i;
	float x2, y;
	const float threehalfs = 1.5F;

	x2 = number * 0.5F;
	y  = number;
	i  = * ( long * ) &y;                       // Evil floating point bit level hacking
	i  = 0x5f3759df - ( i >> 1 );               // What the fuck?
	y  = * ( float * ) &i;
	y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
	return y;
}
```

Asta e de 4x mai rapid decât funcția standard.