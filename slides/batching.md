# Batch Rendering vs Instancing

De ce să desenăm o singură dată, când putem desena de o mie de ori?

---

## Problema: Draw Call Overhead

Fiecare apel `glDrawArrays` implică o discuție între CPU și Driver.
1. CPU setează starea.
2. Driverul validează.
3. GPU-ul primește comanda.

Dacă desenezi 10,000 de asteroizi individual, CPU-ul "gâfâie".

---

## Soluția: Instancing

Trimitem mesh-ul o singură dată (VBO mic).
Trimitem un buffer secundar cu 10,000 de matrici de transformare.

```glsl
layout(location = 3) in mat4 instanceMatrix;
```

Rezultat? O pădure întreagă la 60 FPS.