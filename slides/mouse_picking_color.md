# Mouse Picking (Color)

> De ce sa ne complicam cu matematica atunci cand avem culori?

---

## Problema

> Scena noastra este gata, obiectele sunt la locul lor, dar cum interactionam cu ele?
>
> Cum putem apasa un buton pe interfata noastra? Cum putem sti peste ce obiect este cursorul nostru?

---

## Solutie

> Pentru a afla raspunsul la aceste intrebari, trebuie sa "culegem" informatia din scena noastra.

> Pentru a face acest lucru, exista mai multe abordari, precum:
> * Color Picking &mdash; ne uitam la o scena colorata intr-un anumit mod pentru a determina obiectul
> * Ray Casting &mdash; aruncam o raza de la pozitia mouse-ului in scena noastra calculand intersectia cu un obiect

> Pentru a doua metoda vezi `Mouse Picking (Ray Casting)`

---

## Algoritmul

> Pentru algoritmul bazat pe culoare, este necesar sa randam inca o data cadrul nostru, cu un shader modificat:
>
> * Fiecare entitate care poate fi culeasa va trebui sa aiba un identificator de culegere &mdash; `pickID`
> * In shader-ul nostru, vom folosi acest identificator pentru a colora tot obiectul
> * Scena randata este salvata intr-un `Frame Buffer Object` _(nu direct pe ecran)_, pe care vom opera
> * Calculam pozitia cursorului in spatiul de coordonate al ecranului
> * Ne folosim de `glReadPixels` pentru a afla culoarea pixelului unde se afla cursorul
> * Transformam acea culoare inapoi in `pickID`-ul nostru
> * profit

---

## Exemplu de implementare

```cpp
Entity pick(vec2 screen_position) {

    // Schimbam buffer-ul de desenare
    glBindFramebuffer(GL_FRAMEBUFFER, picking_buffer);

    // Curatam buffer-ul
    glClearColor(0.f, 0.f, 0.f, 1.0f);
    glClear(GL_COLOR_BUFFER_BIT);

    // Setam shader-ul
    glUseProgram(picking_program);

    // Randam scena
    render();

    // Citim culoarea pixelului unde se afla cursorul
    vec3 pixel;
    glReadBuffer(GL_COLOR_ATTACHMENT0);
    glReadPixels(screen_position.x, screen_position.y, 1, 1, GL_RGB, GL_FLOAT, &pixel[0]);

    uint32_t id = fromRGB(pixel);

    // Cautam entitatea cu id-ul citit
    Entity picked_entity = findByPickId(id);

    // Schimbam buffer-ul de desenare inapoi
    glBindFramebuffer(GL_FRAMEBUFFER, target_framebuffer);

    return picked_entity;
}
```

---

## Demo: Picking 2D in Engine

---

## Caracteristici

> * `Pixel perfect` &mdash; verificam direct geometria rasterizata, nu avem marja de eroare
> * `Simplu` &mdash; nu avem nevoie de structuri de date complexe sau algoritmi de optimizare
> * `Limitat` &mdash; putem avea doar 2<sup>24</sup> de obiecte culease _(daca introducem si componenta alpha apar erori cand 2 obiecte se suprapun)_
> * `Costisitor` &mdash; trebuie sa randam inca o data cadrul nostru intr-un buffer separat, `glReadPixels` poate fi scump

---

## Pentru cei interesati

* [1] [_opengl-tutorial - Picking with an OpenGL hack_](https://www.opengl-tutorial.org/miscellaneous/clicking-on-objects/picking-with-an-opengl-hack/)
* [2] [_The Cherno - Mouse Picking // Game Engine series_](https://www.youtube.com/watch?v=GKERbQ7Sqyg)
