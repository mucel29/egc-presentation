# Bloom & Post-Processing

Cum facem lucrurile să strălucească (literalmente).

---

## Pasul 1: Extragerea Luminozității

Randăm scena într-un Framebuffer.
Într-un shader separat, verificăm luminozitatea:

```glsl
// Brightness Kernel
float brightness = dot(FragColor.rgb, vec3(0.2126, 0.7152, 0.0722));
if(brightness > 1.0)
    BrightColor = vec4(FragColor.rgb, 1.0);
else
    BrightColor = vec4(0.0, 0.0, 0.0, 1.0);
```

---

## Pasul 2: Gaussian Blur

Luăm textura cu părțile luminoase și o blurăm (Vertical + Orizontal). Cu cât blurăm mai mult, cu atât "strălucirea" e mai mare.

---

## Pasul 3: Recombinare

Scene Color + Blurred Bright Color = BLOOM.