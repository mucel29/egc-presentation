# Entity Component System (ECS)

Cum să facem procesorul fericit.

---

## OOP vs DOD

**OOP**: Date împrăștiate (Pointer chasing).
**DOD**: Date contigue (Cache hits).

---

## Implementare

Folosim Arrays pentru componente.

```cpp
struct PositionSystem {
    std::vector<Position> positions;
    std::vector<Velocity> velocities;
    
    void Update() {
        // CPU Prefetcher loves this linear memory
        for(int i=0; i<count; i++) 
            positions[i] += velocities[i];
    }
};
```