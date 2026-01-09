# Ray Tracing (Monte Carlo Integration)

Rasterizarea e o minciună. Asta e fizică reală.

---

## Conceptul

În loc să proiectăm triunghiuri pe ecran, aruncăm raze din cameră.
Dacă raza lovește un obiect, calculăm lumina.
Dacă obiectul e oglindă, raza sare mai departe (Bounce).

---

## The Rendering Equation

$$L_o(x, \omega_o) = L_e(x, \omega_o) + \int_{\Omega} f_r(x, \omega_i, \omega_o) L_i(x, \omega_i) (\omega_i \cdot n) d\omega_i$$

Pe scurt: Lumina care iese = Lumina proprie + Lumina reflectată.

---

## De ce e greu?

Pentru o imagine fără "zgomot" (noise), avem nevoie de mii de raze per pixel.
Asta omoară un GPU standard la 60 FPS.

---

## Exemplu

![rt1.png](./res/rt1.png)