# Bloom

> Dacă nu te dor ochii, înseamnă că nu e grafică "Next-Gen".

---

## Problema

> In lumea reala, sursele de lumina extrem de puternice par sa depaseasca conturul obiectului. Lumina se difuzeaza in atmosfera si lentila ochiului. _(sau a camerei)_
>
> Pe un monitor, totusi, un pixel nu poate fi `mai alb decat alb`.
>
> Un soare stralucitor are aceeasi valoare a pixelului ca o foaie de hartie alba. Cum facem diferenta?

---

## Solutia

> Randam scena normal intr-un `Framebuffer` auxiliar, dupa care randam folosindu-l drept textura pentru un patrat cat ecranul.
>
> Peste aceasta textura aplicam un filtru pentru a simula difuzia luminii excesive.
>
> Practic luam pixelii vecini si ii "murdarim" cu lumina noastra.

---

## Procesul

> Avem 3 etape importante in aceasta procesare:
>
> * `Thresholding` &mdash; extragem lumina extrem de puternica
> * `Blurring` &mdash; luam zonele extrase si aplicam un `Gaussian Blur` excesiv peste acestea
> * `Blending` &mdash; recombinam textura blurata cu scena originala

---

## Performanta

> Cea mai costisitoare parte este cea in care aplicam `Gaussian Blur`.
>
> Dacam am blura direct tot cadrul intr-un singur pas, fiecare pixel ar aveam nevoie de $N^2$ samplari de textura.
>
> Problema se rezolva cu un blur in 2 pase: mai intai pe verticala si dupa pe orizontala.

<br>

> O alta optimizare ar fi cea de `Downscaling`:
> 
> * Luam textura noastra cu lumini
> * O micsoram considerabil
> * Aplicam blur-ul pe textura micsorata
> * Facem `upscaling` inapoi la rezolutia originala

---

![QT Bloom](https://doc.qt.io/qtdesignstudio/images/glow-example.webp)

---

#### Da, ma joc warframe. Da, vreau sa fiu un `space ninja`

![Warframe Bloom](./res/warframe.jpg)

---

## Pentru cei interesati

* [1] [_LearnOpenGL - Bloom_](https://learnopengl.com/Advanced-Lighting/Bloom) 
* [2] [_ThinMatrix - OpenGL 3D Game Tutorial 47: Bloom Effect_](https://www.youtube.com/watch?v=LyoSSoYyfVU)