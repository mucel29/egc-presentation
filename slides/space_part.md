# Partitionare Spatiala

> De ce sa ne intrebam daca vedem tot pamantul cand ne aflam in baie?

---

## Quick recap &mdash; Path Tracing

> Dupa cum am discutat in topic-ul `Introducere in Path Tracing` _(sau poate ca nu :))_, atunci cand vrem sa simulam o lumina mai realista, trimitem raze de lumina din camera noastra si le intersectam cu obiectele din scena pana cand ajungem la o sursa de lumina sau trecem peste o limita de pasi.

<br>

> Cum noi vrem sa avem geometrii interesante, avem nevoie de modele alcatuite din triunghiuri. Fata de o simpla intersectie cu o sfera, cea cu un triunghi este mai costisitoare computational, prin algoritmul `Möller-Trumbore`.
>
> O implementare naiva ar verifica aceste intersectii cu toate triunghiurile din scena noastra. Dar ce ne facem cand avem un model cu mii de triunghiuri?

---

## Solutii

> Pornind de la implementarea naiva, care are o complexitate temporala de $\mathcal{O}(n)$, exista diverse strategii care ne pot aduce la un caz mediu de $\mathcal{O}(\log n)$.

<br>

> In cadrul acestei prezentari, voi vorbi despre 2 structuri de date:
>
> * `Octree` &mdash; Impartirea spatiului
> * `BVH` &mdash; Impartirea obiectelor

---

## Octree

> Aceasta structura de date imparte spatiul in 8 subspatii egale, de-a lungul axelor X, Y si Z.
>
> Aceste subspatii sunt apoi la randul lor impartite in alte 8, pana cand unul din ele este gol sau contine un numar redus de obiecte.

<br>

> Unde are sens sa folosim `Octrees`:
>
> * `Path tracing pentru voxeli` &mdash; Minecraft RTX
> * `Point clouds` &mdash; Scanarea 3D
> * `Ray marching` &mdash; Simulari stiintifice _(ex. fluide)_

---

![Octree Example](https://miro.medium.com/v2/resize:fit:1400/0*kvfSZ08xQwnTzCPF.png)

---

## BVH &mdash; Bounding Volume Hierarchy

> Daca un `Octree` imparte spatiul, `BVH` imparte obiectele.
>
> Nu ne pasa sa impartim egal obiectul. Il "invelim" intr-un paralelipiped, dupa care repetam aceasta impachetare pentru geometria din interiorul acestuia, ajungand la "cutiute" cu un numar mic de obiecte.

<br>

> Unde are sens sa folosim `BVH`:
>
> * `Path tracing pentru geometrii poligonale` &mdash; Majoritatea jocurilor video, programe de modelare
> * `Calculare de coliziuni`

---

![BVH Example](https://stanford-cs248.github.io/Cardinal3D/pathtracer/new_results/bvh_bunny_10.png)

---

## Cum folosim aceste structuri?

> In loc sa verificam intersectia cu fiecare triunghi din scena, putem avea in prima faza o verificare `broad` a scenei, in care aflam cu ce `subspatiu` / `cutie` se intersecteaza raza noastra.
>
> Dupa ce aflam aceasta intersectie, parcurgem recursiv `subspatiul` / `arborele` pana cand ajungem la `cutiuta` cu un numar mic de obiecte. Dupa aceea aplicam solutia naiva, verificand doar `K` triunghiuri.

---

## Comparatii

> Pentru a vedea care structura este adecvata proiectului, ne vom uita la cateva proprietati ale structurilor prezentate:

| Feature | BVH | Octree |
| :--- | :--- | :--- |
| `Impartire` | Pe obiecte | In spatiu |
| `Suprapuneri` | Da | Nu, subspatiile sunt disjuncte |
| `Duplicate` | Nu, un triunghi exista intr-un singur nod frunza | Da, geometria care trece dintr-un subspatiu in altul va fi referentiata de ambele |
| `Goluri` | Excelente, spatiul gol este ignorat | Mediocru, poate fi nevoie traversarea subspatiilor goale pentru a ajunge la geometrie |
| `Scene Dinamice` | Rapid, cutiile pot fi redimensionate fara a reconstrui arborele | Incet, trecerea dintr-un subspatiu in altul poate necesita reconstructia Octree-ului |

---

## Pentru cei interesati

* [1] [_Ray Tracing: The Next Week_](https://raytracing.github.io/books/RayTracingTheNextWeek.html)
* [2] [_Sebastian Lague - Coding Adventure: More Ray Tracing!_](https://www.youtube.com/watch?v=C1H4zIiCOaI)