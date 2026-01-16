# Animatie scheletala

> De ce să miști mâna simplu, când poți parsa un XML de 10.000 de linii ca să afli unde e umărul?

---

## Problema

> Avem modele statice frumoase, detaliate, dar sunt... statice.
>
> Daca vrem ca personajul nostru sa alerge, sa sara sau sa faca un backflip, nu putem randa 60 de modele diferite pe secunda. _(ar exploda memoria si nu avem un mini Precis sub birou)_
>
> Trebuie sa deformam geometria personajului in timp real.

---

## Solutia: Scheletul

> In loc sa animam fiecare punct din geometria obiectului manual, definim un set redus de `oase` &mdash; transformari ierarhice
>
> Geometria noastra devine `pielea` oaselor, pozitia fiecarui punct fiind influentata de anumite oase.
>
> Cand miscam osul gatului, geometria gatului si a capului vine dupa el.

---

## Skinning _(Rigging)_

> Daca punctele noastre ar fi fiecare atasate la un singur os, miscarea ar fi robotica. Atunci cand indoim cotul, pielea trebuie sa se intinda, nu sa se rupa.
>
> Solutia este conceptul de `Bone Weights`.

<br>

> Un singur vertex poate fi influentat de mai multe oase simultan. _(de obicei maxim 4 pentru performanta)_
>
> De exemplu, un punct de pe cot poate fi influentat in egala masura de antebrat si de brat.

---

## Matematica

> Pentru a ajunge de la pozitia statica &mdash; `T-Pose` la pozitia animata, fiecare vertex trece prin urmatoarele transformari:
>
> 1. `Inverse Bind Pose` &mdash; ducem punctul din spatiul local de coordonate in spatiul osului - `bone space`
>
> 2. `Bone Transform` &mdash; aplicam transformarea actuala a osului _(unde se afla in cadrul animatiei)_
>
> 3. `Weighted Sum` &mdash; insumam transformarile oaselor care influenteaza punctul, ponderate cu `weight`-ul fiecaruia

---

## Implementare Vertex Shader

```glsl
#version 330 core

// Datele geometriei noastre
layout (location = 0) in vec3 position;

// Oasele care influenteaza vertexul
layout (location = 1) in ivec4 joint_ids;

// Ponderea fiecarui os
layout (location = 2) in vec4 weights;

// Matricile clasice de transformare
uniform mat4 view;
uniform mat4 proj;
uniform mat4 model;

// Ne trebuie o limita superioara pentru oasele noastre
const int MAX_BONES = 50;

// Transformarile globale ale oaselor din scheletul modelului
uniform mat4 bone_matrices[MAX_BONES];

void main() {
	mat4 bone_transform = mat4(0);

    // Iteram prin fiecare os
	for (int i = 0; i < 4; i++) {

        // Nu avem un os valid
		if (joint_ids[i] == -1)
			continue;
		if (joint_ids[i] >= MAX_BONES) {
			break;
		}

        // Adunam transformarea ponderata la transformarea totala
		bone_transform += bone_matrices[joint_ids[i]] * weights[i];
	}

    // Aplicam transformarea oaselor punctului
	vec4 transformed_position = bone_transform * vec4(position, 1.0);

    // Aplicam restul transformarilor pentru a ajunge in clip-space
	gl_Position = proj * view * model * transformed_position;
}
```

---

## Formate care suporta schelete

> Un simplu `OBJ` nu poate contine informatii complexe cum sunt matricile pentru oase, e prea simplu.
>
> De aceea avem nevoie de alte formate precum:
>
> * `Collada` (.dae) &mdash; Un format mai vechi, intretinut de `Khronos` _(ei au facut `OpenGL` si `Vulkan` btw)_
> * * Open, bazat pe `XML` _(o teroare de parsat)_
>
> * `glTF` (.glb) &mdash; Succesorul de la `Khronos`, poate stoca scene intregi
> * * Open, binar
>
> * `Filmbox` (.fbx) &mdash; standard de industrie, creat de `Autodesk`
> * * Proprietar, binar

---

## Animatia propriu-zisa

> Acum ca putem reprezenta miscarile oaselor noastre, cum le animam?

<br>

> In loc sa stocam pozitia oaselor pentru fiecare cadru, folosim `Keyframe`-uri si interpolarea.
>
> * `Keyframe` &mdash; pozitie "cheie" in cadrul animatiei noastre
> * * la momentul `x` piciorul stang este ridicat, la momentul `y` este lasat jos si se ridica cel drept
>
> * `Interpolare` &mdash; stim deja de la `MN` _(GUYS, THE FUTURE IS QUANTUM)_
> * * rotatiile sunt reprezentate prin `Cuaternioni` in locul celor `Euler` pentru a evita `Gimbal Lock`
> * * interpolarea rotatiilor este sferica &mdash; `SLERP`

---

## Probleme in animatie

> Daca nu suntem atenti, putem avea probleme cu animatia noastra.
>
> `Candy Wrapper Effect` &mdash; Atunci cand o articulatie este rotita prea mult, geometria pierde volum si arata ca ambalajul unei bomboane rasucite.
>
> Problema apare din cauza limitarii interpolarii liniare a matricelor. Pentru rezolvare folosim `Dual Quaternion Skinning`.

---

## Demo: "Animatie" scheletala

---

## Pentru cei interesati

* [1] [_LearnOpenGL - Skeletal Animation_](https://learnopengl.com/Guest-Articles/2020/Skeletal-Animation)
* [2] [_ThinMatrix - OpenGL Animation Tutorials_](https://www.youtube.com/playlist?list=PLRIWtICgwaX2tKWCxdeB7Wv_rTET9JtWW)