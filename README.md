# Hierro

Planificador de paquetes para ir a recitales de heavy metal en Córdoba: pasaje de colectivo, entrada, estadía y traslados, saliendo de las diez áreas urbanas más pobladas de Argentina.

No es una boletería. No vende pasajes ni entradas. Sirve para armar el presupuesto del finde antes de comprar.

## Para qué está

Un recital en Córdoba se decide desde lejos: cuántas horas de micro, si conviene cama, cuántas noches hacen falta y si el venue se camina o pide remis. Hierro junta eso en un solo número, por persona y por grupo, y lo compara entre orígenes.

Los orígenes son las áreas del Censo 2022:

| Puesto | Área urbana | Provincias | Población |
| --- | --- | --- | --- |
| 1 | Gran Buenos Aires (AMBA) | CABA y Prov. de Buenos Aires | 15.291.277 |
| 2 | Gran Córdoba | Córdoba | 1.705.741 |
| 3 | Gran Rosario | Santa Fe | 1.455.292 |
| 4 | Gran Mendoza | Mendoza | 1.066.893 |
| 5 | Gran San Miguel de Tucumán | Tucumán | 1.052.194 |
| 6 | Gran La Plata | Provincia de Buenos Aires | 933.474 |
| 7 | Gran Salta | Salta | 671.015 |
| 8 | Mar del Plata | Provincia de Buenos Aires | 644.234 |
| 9 | Gran Neuquén | Neuquén y Río Negro | 551.988 |
| 10 | Gran San Juan | San Juan | 546.613 |

La escala de color (del cian al rojo) sigue la lectura del mapa de habitantes por hexágono de 600 m: más gente, más calor. Acá marca de dónde sale la demanda, no la densidad de un barrio.

## Cómo se usa

1. Elegí un recital de la cartelera, o cargá uno real (banda, fecha, venue y precio de entrada).
2. Elegí desde dónde salís.
3. Ajustá personas, categoría del micro (semicama, cama, cama suite), ida y vuelta, ritmo del viaje y noches.
4. Elegí dónde dormir: hostel en Nueva Córdoba, hotel simple en Centro, hotel en Nueva Córdoba o depto en Güemes.
5. Sumá o sacá comida, remises y merch.
6. Mirá el mismo recital cotizado desde los diez orígenes.
7. Guardá el paquete o copiá el resumen para el grupo.

Los paquetes y los recitales cargados quedan en el navegador (`localStorage`). No hay cuentas.

### Ritmo del viaje

- **Ajustado.** Si el tramo dura hasta 6 horas, se sale el mismo día y se duerme después del show. Si es más largo, el modelo es un micro de noche que llega a la mañana del recital: una noche de hotel.
- **Holgado.** Se llega el día anterior. Dos noches (la previa y la del show), o una si ya vivís en Córdoba.

Los horarios son un modelo para llegar con margen. No son frecuencias de una empresa. Si la salida cae de madrugada, el texto lo avisa.

### Qué suma el total

Por el grupo, y también partido por persona:

- Pasajes de ida y, si corresponde, vuelta. Córdoba capital no paga micro.
- Entradas.
- Alojamiento. El hostel cobra por cama; el hotel, por habitación doble; el depto, hasta tres personas. Cero noches no cobra estadía.
- Remises de ida y vuelta: terminal a hotel (si venís de afuera) y hotel al venue.
- Comida, a razón de un monto fijo por persona y por día.
- Merch y extras por persona.

La cama multiplica el semicama por 1,36 y la cama suite por 1,8. Esas tarifas, las entradas y el precio por noche se pueden pisar en «Ajustar tarifas de referencia».

## De dónde salen los números

Foto de septiembre de 2026, para planificar, no para cobrar.

- El semicama Buenos Aires–Córdoba de referencia arranca en $38.000. El resto de los corredores está escalado por duración y por lo que suele salir ese tramo. Las empresas que figuran (Flecha Bus, Chevallier, Andesmar, La Veloz del Norte y otras) son las habituales del recorrido, no un stock en venta.
- La cartelera de octubre a diciembre de 2026 (Carajo, Lörihen + Tren Loco, O'Connor, Malón, Horcas, A.N.I.M.A.L., Rata Blanca y la Feria del Hierro) es un circuito modelo en venues reales de Córdoba: Club Paraguay, Plaza de la Música, Quality Espacio, Teatro del Libertador y Orfeo Superdomo. Las fechas y los precios de entrada no son venta oficial.
- Comida y remises son estimaciones para no olvidarlos en el presupuesto.

Confirmá siempre en la empresa de micros y en la boletería del show.

## Cómo está armado

Aplicación web en React 19, TanStack Start y Tailwind CSS 4. El estado vive en el cliente con Zustand.

| Pieza | Rol |
| --- | --- |
| `src/data/catalog.ts` | Ciudades, venues, recitales, estadías y tarifas de referencia |
| `src/lib/plan.ts` | Cálculo del paquete, noches sugeridas, horarios modelo y texto para copiar |
| `src/lib/plans-store.ts` | Borrador, recitales propios y paquetes guardados |
| `src/components/hierro-app.tsx` | La pantalla |
| `src/routes/index.tsx` | Ruta `/` |

## Desarrollo

```bash
npm install
npm run dev
```

El servidor de desarrollo escucha en el puerto 8080. `npm run typecheck` chequea TypeScript y `npm run build` genera el build de producción.
