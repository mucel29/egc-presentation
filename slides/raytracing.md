# Path Tracing (Ray Tracing)

> Atunci cand vrei lumina pe bune, arunci raze.

---

## Conceptul

> In loc sa aproximam lumina prin diverse modele de iluminare (Gouraud, Phong), simulam calea (`path`-ul) fiecarei raze de lumina din scena noastra.

---

## Termeni cheie

* `Bounces` &mdash; de cate ori o raza de lumina "sare" de pe un obiect
* `Samples` &mdash; cate raze de lumina sunt "aruncate" dintr-un punct
* `Material` &mdash; proprietatile unui obiect (culoare, reflectivitate, etc.)

---

## Algoritmul

> Spre deosebire de intuitie, razele nu provin din sursa de lumina, ci din camera noastra.

<br>

> Astfel, ecranul nostru este impartit intr-o matrice de puncte, de unde vor fi "aruncate" razele de lumina.

<br>

> Numarul de `sample`-uri determina numarul de raze care au originea in fiecare punct al matricei noastre.

---

> Pentru fiecare raza:
>
> * Calculam intersectia cu un obiect din scena noastra
> * In functie de materialul obiectului, calculam in ce directie se va reflecta (sau refracta) raza de lumina
> * Datorita coliziunii, in functie de materialul nostru, raza de lumina isi pierde o parte din energie
> * Repetam procesul de din ultimul punct de intersectie, pana cand ajungem la o sursa de lumina sau trecem de numarul de `bounce`-uri alocat
> * Pentru fiecare `bounce`, obiectul contribuie la culoarea finala a punctului din matricea noastra

---

## Intersectii

> Fata de randarea traditionala, in care triunghiul este cel mai intalnit, in contextul intersectiilor, este o primitiva destul de costisitoare de procesat.

---

## Intersectia raza &mdash; sfera

> Cea mai rapida intersectie de calculat este cea dintre o raza si o sfera, ecuatia fiind un polinom de gradul 2. Solutiile acestui polinom sunt cele 2 puncte de intersectie ale razei noastre. Una dintre aceste solutii este `fata` sferei, iar cealalta este `spatele` acesteia.
>
> Atunci cand solutiile sunt egale, raza este tangenta la sfera.
>
> Daca polinomul nu are solutii reale, atunci raza nu intersecteaza sfera.

---

## Intersectia raza &mdash; triunghi

> In ciuda complexitatii ecuatiei, majoritatea modelelor se bazeaza pe triunghiuri, deci voi acoperi si algoritmul de intersectie dintre o raza si un triunghi.

<br>

### Algoritmul Möller-Trumbore

> Acest algoritm se foloseste de reprezentarea baricentrica a unui punct in interiorul unui triunghi. 
>
>
> $$ 
> \begin{gathered}
> P = V_0 + u(V_1 - V_0) + v(V_2 - V_0) \\\\
> \\\\
> \text{unde } u \ge 0, \ v \ge 0, \ u + v \le 1 
> \end{gathered}
> $$
> 

<br>

> Utilizand acest tip de coordonate, putem construi un sistem de ecuatii cu care putem calcula intersectia razei cu triunghiul nostru.

---

### Termeni
>
> * $D$ &mdash; vectorul directiei razei
> * $E_1$ &mdash; muchia $V_1V_0$
> * $E_2$ &mdash; muchia $V_2V_0$

---

### Sistemul de ecuatii
>
> $$ 
> \begin{bmatrix} -D & E_1 & E_2 \end{bmatrix} \begin{bmatrix} t \\\\ u \\\\ v \end{bmatrix} = T 
> $$

---

### Solutia sistemului
>
> $$ 
> \begin{bmatrix} t \\\\ u \\\\ v \end{bmatrix} = \frac{1}{det} 
> \begin{bmatrix} 
> det(T, E_1, E_2) \\\\ det(-D, T, E_2) \\\\ det(-D, E_1, T) 
> \end{bmatrix} 
> $$

---

### Testul de intersectie

> Pentru a verifica daca raza noastra chiar se intersecteaza cu triunghiul, verificam solutia sistemului:
>
> * $t \lt 0$ &mdash; intersectia se afla in spatele originii razei
> * $u \lt 0$ sau $v \lt 0$ sau $u + v \gt 1$ &mdash; intersectia se afla in afara triunghiului
> * altfel, intersectia este valida

---

## Materiale

> Obiectele noastre pot avea diverse proprietati fizice, care influenteaza cum raza noastra interactioneaza cu ele.

---

### Proprietati fizice

> Aceste proprietati pot fi combinate in conceptul de `material`:
>
> * `Roughness` _(sau `Fuzz`)_ &mdash; asprimea materialului
> * * _descrie cat de dispersata este reflexia luminii_
> * * _o asprime mai mica ofera un aspect mai polisat, asemenea unei oglinzi_
>
> * `Refractive Index` &mdash; indexul de refractie
>
> * * _folosit in calculul deviatiei razei de lumina la tranzitia dintr-un mediu in altul_
>
> * `Albedo` &mdash; culoarea reflectata

<br>

> Evident, exista mai multe proprietati, dar ma voi axa in special pe acestea.

---

### Tipuri de material

> Folosind aceste proprietati, putem defini urmatoarele clase de materiale:
>
> * `Diffuse` &mdash; material cu culoare constanta
>
> * `Metal` &mdash; material cu culoare constanta si reflectivitate mare
>
> * `Dielectric` &mdash; material cu culoare constanta si reflectivitate mica
> * * _exemplu: sticla_
>
> * `Emissive` &mdash; material care emite lumina

<br>

> Acestea sunt doar exemple, fiind folosite in demo.

---

## Coliziunea

> Odata ce am gasit intersectia, trebuie sa calculam in ce directie o va lua raza noastra.

---

### Pentru materialele `Diffuse`

> * Din punctul de intersectie, alegem un vector aleator care se afla pe sfera unitate care se afla in aceeasi hemisfera cu normala la acel punct.
>
> * Adaugam vectorul obtinut normalei. 
> * * _(Distribuire Lambertiana)_
>
> * Culoarea razei este combinata cu culoarea materialului.

---

### Pentru materialele `Metal`

> * Directia razei este reflectata fata de normala la punctul de intersectie.
>
> * Noua directie este combinata cu un vector aleator de pe sfera unitate proportional cu asprimea materialului.
>
> * Culoarea razei este combinata cu culoarea materialului.

---

### Pentru materialele `Dielectric`

> * Directia razei este calculata pe baza legii lui `Snell`.
>
> * In functie de unghiul de intersectie, poate aparea fenomenul de reflexie totala.

---

### Pentru materialele `Emissive`

> * Lumina este absorbita de material, acesta emitand propria sa lumina.
> * * _cel putin in demo asta fac_

---

## Probleme

> Chiar daca acum lucram direct cu razele de lumina, acestea sunt in continuare doar o aproximare a fenomenului real.

<br>

> In consecinta, apar noi tipuri de probleme.

---

### Noise & Aliasing

> Datorita numarului finit de raze si al limitarilor de bounce-uri, unii pixeli vor fi inevitabil incorecti.
>
> Acest lucru rezulta in fenomenul de `noise`.

<br>

> Totodata, din cauza numarului limitat de puncte din matricea noastra, apare si `aliasing`-ul.

---

> Pentru a rezolva aceste probleme, avem la dispozitie 2 solutii.

<br>

> 1. `Super Sampling`
>
> Pentru fiecare punct din matricea noastra, generam mai multe raze cu directii usor decalate, sperand ca mai multe dintre acestea sa ajunga catre sursa de lumina.

<br>

> 2. `Temporal Filtering`
>
> Pentru fiecare cadru, ne folosim de cadrele generate anterior, completand golurile cu pixeli din cadrele anterioare.
>
> Acest lucru merge cel mai bine in combinatie cu prima solutie, adaugand variatii in culoarea pixelilor, care vor fi combinate cu valoarea din cadrul curent.

---

![Exemplu de-noising](https://user-images.githubusercontent.com/44236259/127881165-f86d19b0-65f0-4b07-81e6-2ff1b92eea1e.gif)

---

### Performanta

> Datorita algoritmului de intersectie naiv, care verifica fiecare triunghi din scena, suntem limitati la geometrii simple.
>
> Aceasta problema este explorata in topic-ul `Partitionare Spatiala`.

---

## Demo: O scena cu triunghiuri si sfere

---

![Capture 1](./res/rt0.png)

---

![Capture 2](./res/rt1.png)

---

![Capture 3](./res/rt2.png)

---

![Capture 4](./res/rt3.png)

---

![Capture 5](./res/rt4.png)

---

### Pentru cei interesati

* [1] [_Ray Tracing in One Weekend_](https://raytracing.github.io/books/RayTracingInOneWeekend.html)
* [2] [_Möller–Trumbore intersection algorithm_](https://en.wikipedia.org/wiki/M%C3%B6ller%E2%80%93Trumbore_intersection_algorithm)
* [3] [_The Cherno - Ray Tracing_](https://www.youtube.com/playlist?list=PLlrATfBNZ98edc5GshdBtREv5asFW3yXl)
* [4] [_Sebastian Lague - Coding Adventure: Ray Tracing_](https://www.youtube.com/watch?v=Qz0KTGYJtUk)