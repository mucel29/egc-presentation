# Text Rendering

> De ce e mai simplu să calculezi o orbită planetară decât spațiul dintre `A` și `V`

---

## Problema

> Avem scena noastra, totul este polisat, umbrele sunt crispy si totul este gata de prezentare.
> 
> Dar cum afisam informatii pe ecran? Cum stie jucatorul cat HP are? Doar nu isi deschide consola si imparte ecranul in doua ca sa vada cata mana mai are, nu?

<br>

> Raspunsul este simplu, afisam text pe ecran, implementarea... 

---

## Solutie

> Randarea textului este un proces destul de migalos, care implica o serie de etape:
>
> * `Rasterizarea` &mdash; trebuie sa scoatem glifele din fontul nostru cumva
> * `Impachetarea` &mdash; nu vrem sa avem cate o textura pentru fiecare caracter
> * `Pozitionarea` &mdash; nu toate caracterele ocupa acelasi spatiu si au aceeasi distanta intre ele
> * * _(exceptie fiind fonturile monospace)_
> * `Randarea` &mdash; pana la urma trebuie sa desenam si glifele alea undeva
> * * _(daca vrem sa ne complicam viata si mai mult, putem adauga si efecte, precum outline, shadow, etc.)_

> Hai sa vedem ce este asa greu la fiecare.

---

### Rasterizarea

> Fonturile noastre sunt stocate in fisiere sub forma vectoriala &mdash; spline-uri Bezier cubice. _(ex. `TrueType` si `OpenType`)_.

<br>

> Pentru a lucra cu ele, este nevoie sa le rasterizam la dimensiunea maxima la care ne asteptam sa le folosim. Pentru asta, exista diverse biblioteci:
>
> * `FreeType` &mdash; standardul de facto
> * * Matur, complex, profesional
>
> * `stb_truetype` &mdash; lightweight single-header
> * * Simplu, usor, bun pentru proiecte mici

---

### Impachetarea

> Nu vrem ca fiecare glifa sa fie o textura separata, mai ales daca folosim mai multe fonturi. Totodata, nu putem sa le aruncam pe toate intr-o singura linie, deoarece nu vom mai putea sa determinam pozitia corecta in shader atunci cand trebuie sa le desenam. _(atingem limita de precizie a reprezentarii in virgula mobila)_
>
> Pentru asta, avem nevoie de o partitionare pe 2 dimensiuni, minimizand spatiul mort din textura. Aceasta este o problema de `bin packing`.

<br>

> Pentru asta, putem sa fim masochisti _(ca mine)_ si sa implementam algoritmul nostru, sau putem sa folosim biblioteci precum `stb_rect_pack`.

---

### Pozitionarea

> Atunci cand vrem sa afisam text pe ecran, trebuie sa construim geometria pentru fiecare glifa si sa o aranjam pe locul corect. 

<br>

> Acest lucru presupune sa avem cateva cunostinte de tipografie. _(depind de font)_
>
> * `Baseline` &mdash; linia pe care se afla glifele
> * `Cap height` &mdash; inaltimea literelor mari si plate _(ex. `M`, `I`)_
> * `Ascender` &mdash; linia unei glife care trece de `Cap height` _(ex. `d`, `l`)_
> * `Descender` &mdash; linia unei glife care trece de `Baseline` _(ex. `g`, `y`)_
> * `Kerning` &mdash; distanta specifica dintre 2 glife consecutive
> * * _de exemplu, `A` si `V` sunt mai apropiate decat `H` si `E`_

<br>

> Cu acestea, aranjam dreptunghiurile pe ecran si ne pregatim sa pictam glifele.

---

#### In caz ca nu erati deja confuzi

![Apple Font Metrics](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/FontHandling/Tasks/Art/glyph_metrics.gif)

---

#### Si ca sa ma asigur

![Kerning](https://www.quackit.com/pix/stock/css_font-kerning_example.gif)

---

### Randarea

> Acum ca avem dreptunghiurile, ne mai ramane doar sa le dam forma glifelor noastre.
>
> Pentru a face asta, vom folosi atlasul creat pentru a identifica litera si pentru a sterge golurile din aceasta.

---

### Shader

```glsl
#version 330 core

// Coordonatele glifei in atlas
in vec2 uv;

uniform sampler2D atlas;

out vec4 color;

void main() {
    // Citim pixelul din atlas si folosim canalul rosu
    // (atlasul este monocromat)
    float value = texture(atlas, uv).r;

    // Stergem pixelul daca este aproape negru (gol)
    if (value < 0.1)
        discard;

    // Text alb
    color = vec4(1);
}

```

---

## Demo: Text rendering

---

## Alternativa &mdash; SDF

> O alternativa la rasterizarea simpla este folosirea unui `SDF` &mdash; `Signed Distance Field`
>
> Acest nou tip de textura ne ofera informatii despre cat de aproape de muchie este un pixel al glifei noastre. 

---

![Exemplu SDF](https://i0.wp.com/css-tricks.com/wp-content/uploads/2019/11/webgl-05.png?ssl=1)

---

### De ce am vrea sa folosim un SDF?

> * `Dimensiunea` &mdash; putem stoca glifele la rezolutii mult mai mici
> * `Scalabilitate` &mdash; putem scala glifele la rezolutii mai mari fara sa pierdem calitatea acesteia
> * * SDF-urile sunt prietenoase cu interpolarea ce are loc pe placa video in timpul randarii
> * * O problema este mentinerea ascutimii colturilor
> * `Efecte gratis` &mdash; modificand cativa parametri in shader putem obtine efecte precum `Outline` si `Glow`

---

### Shader SDF &mdash; Outline

```glsl
// Distanta centru - muchie
const float width = 0.5;

// Netezire muchie (tranzitie muchie - fundal)
const float edge = 0.1;

// Distanta centru - contur
const float outline_width = 0.7;

// Netezire contur (tranzitie contur - fundal)
const float outline_edge = 0.1;

// Culoarea conturului
const vec3 outline_color = vec3(0);

void main() {
    // Calculam pentru interiorul glifei
    float distance = 1.0 - texture(atlas, uv).r; // Distanta centru - muchie
    float alpha = 1.0 - smoothstep(width, width + edge, distance);

    // Calculam pentru interiorul conturului
    float outline_distance = 1.0 - texture(atlas, uv).r;
    float outline_alpha = 1.0 - smoothstep(outline_width, outline_width + outline_edge, distance);

    float final_alpha = alpha + (1.0 - alpha) * outline_alpha;
    vec3 final_color = mix(outline_color, vec4(1), alpha / final_alpha);

    // Text alb, contur negru
    color = vec4(final_color, final_alpha);
}
```

---

## Alte alternative

> * `MSDF` &mdash; `SDF` pe toate cele 3 canale pentru a pastra colturile ascutite
> * `Triangulare` &mdash; generarea glifelor direct ca geometrie in scena
> * `Vectorial` &mdash; curbele matematice sunt evaluate direct pe placa video

---

## Pentru cei interesati

* [1] [_LearnOpenGL - Text Rendering_](https://learnopengl.com/In-Practice/Text-Rendering)
* [2] [_Material Design - Understaing typography_](https://m2.material.io/design/typography/understanding-typography.html)
* [3] [_Valve - Improved Alpha-Tested Magnification for Vector Textures and Special Effects_](https://steamcdn-a.akamaihd.net/apps/valve/2007/SIGGRAPH2007_AlphaTestedMagnification.pdf)
* [4] [_Viktor Chlumský - Improved Corners with Multi-Channel Signed Distance Fields_](https://dcgi.fel.cvut.cz/wp-content/wpallimport-dist/publications/pdf/publications-2018-sloup-cgf-msdf-paper.pdf)
* [5] [_ThinMatrix - OpenGL 3D Game Tutorial 32: Font Rendering_](https://www.youtube.com/watch?v=mnIQEQoHHCU)
* [6] [_ThinMatrix - OpenGL 3D Game Tutorial 33: Distance Field Text Rendering_](https://www.youtube.com/watch?v=d8cfgcJR9Tk)
* [7] [_Sebastian Lague - Coding Adventure: Rendering Text_](https://www.youtube.com/watch?v=SO83KQuuZvg)