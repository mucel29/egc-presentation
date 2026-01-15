# Mouse Picking (Ray Casting)

> Daca suntem daltonisti, ne bazam pe matematica.

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

> Pentru a doua metoda vezi `Mouse Picking (Color)`

---

## Algoritmul

> Pentru acest algoritm, trebuie sa aruncam o raza de la pozitia cursorului, in scena noastra:
>
> * Convertim coordonatele cursorului in coordonate din spatiul lumii
> * * _(ne folosim de inversa proiectiei si a matricii de vizualizare)_
> * Calculam intersectia razei cu fiecare obiect din scena
> * Alegem intersectia cea mai apropiata de cursor
> * profit

---

## Exemplu de implementare

```cpp
Entity pick(vec2 screen_position) {
    // Asumam ca pozitia cursorului este deja in NDC
    
    Camera cam = getSceneCamera();

    mat4 inv_proj = inverse(cam.projection);
    mat4 inv_view = inverse(cam.view);



    // Convertim pozitia de pe ecran
    // La pozitie in spatiul lumii
    vec4 clip_pos = vec4(screen_position, -1.0f, 1.0f);
    vec4 eye_pos = inv_proj * clip_pos;
    eye_pos = vec4(eye_pos.x, eye_pos.y, -1.0f, 0.0f);
    
    vec3 ray_direction = normalize(vec3(inv_view * eye_pos));
    vec3 ray_origin = cam.position;

    // Eventual ne putem folosi de glm::unproject()

    // Cautam obiectul cel mai apropiat de raza
    Entity closest_entity = Entity::None;
    float min_dist = FLT_MAX;

    for (const auto& entity : scene.entities) {
        float dist = entity.intersect(ray_origin, ray_direction);
        
        if (dist > 0 && dist < min_dist) {
            min_dist = dist;
            closest_entity = entity;
        }
    }

    return closest_entity;
}
```

---

## Caracteristici

> * `Rapid` &mdash; tot calculul are loc pe procesor, inainte sa randam scena
> * * _pentru un numar mare de obiecte este nevoie sa folosim structuri de accelerare_
> * * _vezi `Ray Tracing - Partitionare Spatiala`_
> * `Scalabil` &mdash; putem avea un numar nelimitat de obiecte in scena
> * `Aproximativ` &mdash; nu ne ofera acuratete pixel perfect
> * * _bun pentru selectii generale si dragging, unde precizia nu este critica_
> * * _putem avea probleme cand obiectele se suprapun_

---

## Pentru cei interesati

* [1] [_LoganDev - How to pick a 3D object using raycasting in C++_](https://medium.com/@logandvllrd/how-to-pick-a-3d-object-using-raycasting-in-c-39112aed1987)
* [2] [_ThinMatrix - OpenGL 3D Game Tutorial 29: Mouse Picking_](https://www.youtube.com/watch?v=DLKN0jExRIM)