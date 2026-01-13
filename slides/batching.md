# Batch Rendering

> Cum sa nu sunam placa grafica prea des. _(minutele sunt scumpe aici)_

---

## Problema: Draw Call Overhead

> Fiecare apel `glDrawArrays` implică o discuție între procesor și placa video:
> 1. Procesorul setează starea.
> 2. Driverul validează.
> 3. Placa video primește comanda.

<br>

> Dacă desenezi 10,000 de asteroizi individual, poti sa-ti iei adio de la cadrele pe secunda.

---

## Soluția: Batching

> In loc sa trimitem catre placa video fiecare obiect pe care vrem sa-l desenam, cu propriul lui VAO si VBO-uri, putem sa comasam toata geometria intr-un singur VAO si VBO.

<br>

> Astfel, procesorul trebuie sa "sune" placa grafica doar o singura data, reducand overhead-ul.

---

## Tipuri de Batching

> Există mai multe tipuri de batching:
> 1. Static Batching _(Obiecte statice: Teren, Cladiri)_
> 2. Dynamic Batching _(Obiecte care se misca: Personaje, Platforme)_
> 3. Instancing _(Obiecte identice: Particule, Frunze, Iarba)_

---

## Exemplu: Batching dupa texturile folosite

>
> Un obiect din scena noastra poate avea nevoie de una sau mai multe texturi pentru a fi desenat.

<br>

> Placa video suporta un numar limitat de texturi care pot fi folosite simultan. _(ex. 32 de unitati de texturi)_

<br>

> Daca avem grija sa contorizam texturile folosite si alegem obiecte care refolosesc aceleasi texturi, cum ar fi textul care are un atlas comun pentru toate glifele, putem comasa toate obiectele intr-un singur VAO si VBO.

<br>

> _**Dar cum stim in care unitate se afla textura obiectului curent?**_
>
> Pentru asta introducem un atribut nou obiectelor noastre care va contine indicii unitatilor de textura pe care le foloseste. 

---

## Demo: Texture batching

---

## Instancing

> Sa presupunem ca jocul nostru este foarte polisat si are foarte multe particule care trebuie desenate.

<br>

> Particulele fiind dinamice, nu putem sa facem un batch static, dar putem sa ne folosim de faptul ca toate au aceeasi geometrie. _(ex. quad-uri in cazul particulelor 2D)_

<br>

> Astfel, declaram geometria unei particule o singura data (vertexii, normala, textura, culoare) si stocam atributele specifice (pozitia, rotatia, scalarea) intr-un buffer in care vom indexa cu ajutorul unui ID transmis fiecarei instante la momentul desenarii.

---

## Exemplu de implementare

```cpp
// Geometria pe care o vor folosi toate instantele
std::vector<Vertex> instance_vertices = {...};
std::vector<uint32_t> instance_indices = {...};


// Datele specifice fiecarei instante
std::vector<glm::mat4> instance_data = {...};

// Incarcarea datelor specifice fiecarei instante
for(int i = 0; i < 4; i++) {
    glEnableVertexAttribArray(3 + i); 
    glVertexAttribPointer(3 + i, 4, GL_FLOAT, GL_FALSE, sizeof(glm::mat4), (void*)(i * sizeof(glm::vec4)));
    
    // Setam divizorul la 1 -> atributul se schimba o data per instanta
    glVertexAttribDivisor(3 + i, 1); 
}

// Desenarea instantiata
glDrawArraysInstanced(GL_TRIANGLES, 0, instance_vertices.size(), instance_data.size());
```

<br>

> O alternativa ar fi sa alocam un buffer uniform in shader indexandu-l cu `gl_instanceID`, dar asta ne limiteaza la `~250` de instante. _(Atingem limita de uniforme a placii video)_

---

## Concluzii

> Batching-ul poate fi o solutie eficienta pentru a reduce overhead-ul la desenare.

<br>

> Pe cat de atractiv suna `un singur apel pentru toata scena`, trebuie sa fim atenti ce parte a scenei noastre poate fi comasata, astfel putem risca sa readucem overhead-ul la desenare.

<br>

### Pentru cei interesati

* [1] [_LearnOpenGL - Instancing_](https://learnopengl.com/Advanced-OpenGL/Instancing)
* [2] [_ThinMatrix - OpenGL 3D Game Tutorial 13: Optimizing_](https://www.youtube.com/watch?v=X6KjDwA7mZg)