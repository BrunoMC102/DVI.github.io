# Knightmares

Nombre del Juego: KnightMares
Nombre del Grupo : 6

Dirección del juego: https://brunomc102.github.io/DVI.github.io/


IDEA GENERAL

Este juego se basa en un juego Roguelike que combinará las vistas de Side-Lateral y Top-Down.
En el Scroll-Lateral el personaje podrá andar y saltar intentando atravesar una pequeña habitación desafiante para volver al mapa en Top-Down.

En el Top-Down el personaje deberá pasar habitaciones llenas de enemigos para llegar al final de la mazmorra. En algunas habitaciones tendrá la posibilidad de acceder a ciertas zonas concretas para pasar al SideLateral. 

-Mecanicas:

Mecánicas del personaje principal(ScrollLateral):
En esta vista el personaje :
   +Moverse, para avanzar a lo largo de la sala. 
   +Saltar, para alcanzar plataformas, evitar trampas,etc..
   +Opcionalmente, poder correr para llegar a ciertas plataformas que estén más alejadas.
   +Atacar, en el caso que haya enemigos que compliquen el camino del protagonista se podrá atacar para derrotarlos.

Mecanicas del personaje principal(TopDown)
En esta vista el personaje :
   +Moverse, para avanzar a lo largo de la sala.
   +Esquivar, para evadir los ataques de los enemigos 
   +Atacar cuerpo a cuerpo, para poder eliminar a los enemigos que traten de acercarse al jugador
   +Atacar a distancia, para poder eliminar a los enemigos a la distancia
   +Tendrá un bastón que podrá utilizar gastando maná

Dinamicas:
Gracias a las mejoras que se van otorgando el jugador podrá desarrollar nuevas dinámicas gracias a los cambios
en el gameplay a través de las mejoras que se le otorguen:
-Disparar a través de superficies
-Mejorar el esquive para evitar flechas



Menu inicial
El menu inicial del juego tiene un diseño por ahora bastante basico donde se da la opción de jugar al juego 
o de cambiar las opciones del juego donde para futuros hitos trataremos de mejorar implementado opciones como quitar 
la música o reiniciar el juego.



Stats del personaje:

Vida
Mana
Velocidad
Daño a melee
Daño a distancia
Rango
Velocidad de ataque:

Menu o lobby inicial:

-Tienda 
-Lugar para mejorar el arbol de habilidades(Extra)
-Npcs(Extra)
-Banco(Extra)


Recursos del jugador:
-Oro o moneda(para tiendas)
-Vida
-Otra moneda 
-Habitaciones
-Extra: Cambiar skin por mejoras.

Personaje:
-Caballero 

NPCS(Non Player Character):
Herrero(te permitirá realizar mejoras respecto a las armas)
General del cuartel (hablará sobre tu historia)

Enemigos:
-Hormigas
-Bandidos
-Slime
-Esqueletos
-Minotauros
-Goblins
-Arqueros
-Boss

Controles
Se podra jugar con mando y con teclado.

Paleta para el lobby: Adobe Color

Paleta mazmorra tonos más oscuros poco a poco.

Principios de niveles: 
En el Top-Down serán pequeñas habitaciones con enemigos donde el jugador deberá limpiar la habitación para poder avanzar.
En el Scroll-Lateral serán habitaciones más grandes donde el jugador deberá cruzar los diferentes obstaculos hasta el final.  


BACKGROUND GENERAL DEL JUEGO

La trama del juego nos cuenta la historia de un caballero que pierde la memoria y con la ayuda del tabernero de la aldea que conoce las historias que la gente cuenta sobre él, recordará el héroe que es....o morirá en el intento.


IDEA DEL ARTE
En cuanto al arte del juego, nos hemos inspirado en un estilo pixel-art, semejante a juegos como Enter The Gungeon o el Moonlighter, pero con tonalidades mas oscuras haciendo referencia al medievo.



UML INICIAL
En la carpeta de UML del repositorio.


PLAN PARA HITOS RESTANTES

De cara a futuros hitos, tenemos planeadas varias mejoras para implementar en el juego. Las más importantes, y que implementaremos 
primero serán: 
-Meter más sonidos y animaciones al juego
-Crear mejores menus del juego, incluyendo el menu principal y la interfaz del usuario en general.
-Crear boss con varios ataques y fases.
-Crear un tutorial.
-Dentro de la aldea crear nuevos sitios y NPCS que le den vida al juego 

Desde aqui se podrá acceder al tutorial, y se podrán mejorar habilidades.
-Crear diferentes tipos de salas: Tiendas/tesoro/desafio/secreta
-Un arbol de habilidades, que se podrá ir mejorando desde el lobby.

Otras mejoras menos prioritarias que tambien tenemos planeado son:
-Aumentar la cantidad de enemigos.
-Aumentar la cantidad de objetos.
-Crear zonas nuevas con estetica distinta, y enemigos distintos.

-Para este hito hemos trabajado bastante para pulir bastante todo el tema relacionado con el topDown,
para el hito final trabajaremos para tener un scrollLateral bien implementado.

GDD más adelante:

Descripcion del proceso


TESTING CON JUGAORES EXTERNOS AL PROYECTO
   - ¿Qué se prueba?
      El objetivo principal de las pruebas es comprobar si un jugador real que no conoce nada sobre el desarrollo del juego, es capaz de utilizar las mecánicas y de
      pasar sin problema por los diferentes niveles tal y como los desarrolladores lo pensamos en un principio. 
      Esta experiencia nos sirve para aprender del jugador y retocar lo necesario para mejorar la experiencia, la jugabilidad y corregir errores inesperados que
      aparezcan por comportamientos que no hayamos tenido en cuenta a la hora de programar el juego.
   - ¿Cómo se lleva a cabo una prueba?
      Durante las pruebas, el jugador es el unico que tiene control del juego, haciendo que sea lo más cercano posible a una situación real. Pero a diferencia de esta,
      un miembro del equipo estará con el durante la experiencia para ayudar en caso de que no pueda avanzar o tenga dudas de cualquier tipo. Tanto el comportamiento
      del jugador como estas dudas son el material que nos sirve para hacer todos estos pequeños cambios en el juego.
   -  Número de participantes
   -  Resultados de las pruebas
   -  Conclusiones (que funciona y que no)
