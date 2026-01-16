# Frustum Culling

> Daca un copac dintr-o padure cade si nu e nimeni acolo sa auda, oare chiar a cazut?

---

## Problema

> Hai sa ne imaginam o lume imensa, gen `No Man's Sky`. Avem o infinitate stele, planete care orbiteaza stele, animale si plante pe planete, etc.
>
> Implicit, banda grafica incearca sa proceseze tot ce ii trimitem.
>
> Chiar daca noi suntem pe planeta X, placa video incearca sa proceseze tot universul, doar ca mai apoi sa fie aruncat la gunoi in etapa de `clipping`.

<br>

> Rezultatul? O gaura neagra!

---

## Solutia

> **Culling** _(triere)_
>
> Inainte sa trimitem un obiect in banda, verificam daca acesta se intersecteaza cu campul vizual &mdash; `Frustum`-ul camerei.
>
> Daca este complet in afara acestuia, nu-l mai trimitem. Salvam resurse si integritatea spatiu-timp este asigurata.

---

## Frustum

> Putem construi geometria campului nostru vizual prin 6 planuri:
>
> * `Adancime` &mdash; `Near` & `Far`
> * `Vertical` &mdash; `Top` & `Bottom`, date de `FOV`
> * `Orizontal` &mdash; `Left` & `Right`, date de `Aspect Ratio`

---

![LOGL - Frustum Culling](https://learnopengl.com/img/guest/2021/Frustum_culling/VisualCameraFrustum.png)

---

## Matematica

> Ca sa verificam daca un obiect se afla in acest camp vizual, avem nevoie de bunul nostru prieten, `Algebra Liniara`.

---

> Ne vom folosi de `Distanta cu Semn` fata de un plan.
>
> Ecuatia unui plan:
> $$Ax + By + Cz + D = 0$$
>
> Unde $(A, B, C)$ este vectorul normal al planului (directia în care "priveste" planul, spre interiorul frustum-ului).

<br>

> Daca avem un punct $P(x, y, z)$:
> * $dist > 0$ $\rightarrow$ Punctul e in fata planului (inauntru)
> * $dist < 0$ $\rightarrow$ Punctul e in spatele planului (afara)

---

## Optimizare

> Daca avem un obiect cu mii de triunghiuri, testul de intersectie cu toate cele 6 planuri va dura o vesnicie.
>
> Putem simplifica munca procesorului daca tratam toate obiectele ca pe niste forme simplificate:
>
> * `Sfera` &mdash; cel mai rapid, verificam doar distanta centrului fata de plan +/- raza
> * `AABB` (Axis Aligned Bounding Box) &mdash; mai precis, dar putin mai complex

---

## Pentru cei interesati

* [1] [_LearnOpenGL - Frustum Culling_](https://learnopengl.com/Guest-Articles/2021/Scene/Frustum-Culling)