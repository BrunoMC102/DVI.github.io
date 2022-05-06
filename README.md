# Knightmares

*Nombre del Juego:* KnightMares

*Nombre del Grupo:* Knight Studios

![alt text](https://github.com/BrunoMC102/DVI.github.io/blob/main/ImagenJuego.png)


Dirección del juego: https://brunomc102.github.io/DVI.github.io/


### IDEA GENERAL

Este juego se basa en un juego Roguelike que combinará las vistas de Scroll-Lateral y Top-Down.
En el Scroll-Lateral el personaje podrá andar y saltar intentando atravesar una pequeña habitación desafiante para volver al mapa en Top-Down.

En el Top-Down el personaje deberá pasar habitaciones llenas de enemigos para llegar al final de la mazmorra donde se encontrará el boss del juego.
En la habitación principal de la mazmorra tendrá acceso a los cuatro niveles del Scroll-Lateral y deberá conseguir los tres tipos de poderes diferentes
para poder pasar cada uno de los niveles. 

### BACKGROUND GENERAL DEL JUEGO

La trama del juego nos cuenta la historia de un caballero que tras recibir el informe de que algo ha pasado en la aldea, decide hablar con el general del tercer escuadrón de Radagon, Roger.
Básicamente el malvado hechicero Radahn, uno de los hechiceros más temidos de la época ha vuelto a la aldea cuando se pensaba que había sido derrotado por Radagon, uno de los caballeros más valerosos de la época que falleció en la pelea. Resucitado no sabemos por qué Radahn se prepara para intentar lanzar uno de sus hechizos más peligrosos.
Como caballero deberás adentrarte en la mazmorra y descubrir que es lo que planea Radahn y cómo puedes detenerle. 
Durante tus aventuras descubrirás la existencia de llaves secretas escondidas dentro de la mazmorra, las cuales contienen un poder secreto que deberás luchar para saber como explotar su verdadero potencial. 
Tras descubrir que el malévolo mago está intentando invocar a una deidad maligna, el caballero deberá utilizar el poder de las cuatro llaves secretas para entrar a la dimensión donde se esconde la deidad para derrotarla y salvar así a su aldea.

### MECÁNICAS

Dentro de Knightmares el jugador tendrá diferentes mecánicas dentro del juego, dependiendo si estas en el ScrollLateral o en el TopDown:

•	Mecánicas del personaje principal (ScrollLateral):
En esta vista el personaje podrá:
+ **Moverse**, para avanzar a lo largo de la sala.
+ **Saltar**, para alcanzar plataformas, evitar trampas,etc..
Además, al ser un juego tipo MetroidVania, este juego tiene mecánicas que solo se consiguen si avanzas dentro de la mazmorra en TopDown y vences al boss. Con ello puedes conseguir nuevas mecánicas dentro del Scroll, como son:
+ **Doble salto**, para llegar a sitios inalcanzables anteriormente.
+ **Dash**, el personaje se deslizará horizontalmente llegando más lejos en sus saltos.
+ **Cajas misteriosas**, el personaje desbloqueará la posibilidad de tirar cajas y pararlas en el aire. Con ella podrás pasar por pinchos y llegar a nuevos niveles de altura.

•	Mecánicas del personaje principal (TopDown):
En esta vista el personaje podrá:
   + **Moverse**, para avanzar a lo largo de la sala.
   + **Esquivar**, para evadir los ataques de los enemigos 
   + **Atacar cuerpo a cuerpo**, para poder eliminar a los enemigos que traten de acercarse al jugador
   + **Atacar a distancia con arco**, para poder eliminar a los enemigos a la distancia con un arco con flechas limitadas.
   + **Atacar a distancia con bastón**, para poder eliminar a los enemigos a la distancia con un bastón que al golpear a un enemigo se dispersará en cuatro direcciones golpeando en nuevos enemigos. Este ataque costará maná al jugador.
Aparte de las mecánicas del personaje, el jugador tendrá también:
+ **Interfaz gráfica de usuario**: el jugador contará con una interfaz donde se le mostrará la información de cuantos recursos tiene en ese momento. Los recursos del jugador son varios, pero estos se desarrollan más en el apartado de Recursos.
+ **Minimapa**, mapa de ayuda del jugador para viajar a lo largo de la mazmorra. Mientras el jugador este en combate desaparecerá para no molestar, una vez completado la habitación volverá y se descubrirá las zonas colindantes a esta habitación.
+ **Cruzar salas**: A medida que el jugador vaya avanzando a lo largo de las salas podrá cruzar a través de las salas. Cuanto más profundo vaya dentro de ella los niveles serán más complicados.

+ **Recoger objetos**: A lo largo de la mazmorra, el jugador podrá recoger objetos que le aumentan los atributos pasivamente, le aumenten sus recursos como vida o pociones o le añadan una nueva mecánica.
+ **Obtención maná**: Tras vencer a los enemigos el jugador recibirá maná de ellos.
+ Morir: Si la vida del jugador llega a 0, el jugador perderá y tendrá que volver a empezar en la aldea sin ninguna de las mejoras pasivas que tenía, incluyendo también la perdida de pociones y dinero.
+ **Ganar**: En el caso que el jugador consiga vencer al boss del juego podrá volver a la aldea para jugar otra partida cogiendo la corona que aparecerá en la sala del boss. En el caso que el jugador haya conseguido todas las llaves posibles con sus poderes actuales dentro de los Scrolls, al vencer al boss desbloqueará una nueva habilidad dentro del Scroll, que le servirá para completar un nuevo nivel.
+ **Viajar hacia el boss final**: En el caso que el jugador haya conseguido todas las llaves de los Scrolls y mate al boss principal, al lado de la corona para volver a la aldea, se abrirá un portal que permitirá al jugador visitar la zona del verdadero boss final.
+ **Tienda**: En la aldea, el jugador será capaz de comprar objetos al herrero que le ayudarán en su instancia en la mazmorra.


### DINÁMICAS

Dentro de este apartado describiremos las dinámicas del juego, la manera de ver las mecánicas del juego en su totalidad y descubrir estrategias o pensamientos a lo largo de la experiencia dentro del juego. 

- Una de las dinámicas más drásticas dentro de nuestro juego, es el aprendizaje del jugador de cara a enfrentarse a un enemigo especifico. Una vez que el jugador debe vencer a un     enemigo es mejor aprenderse los patrones de ataque de los enemigos para evitar recibir daño dentro de las salas.
Otra dinámica muy marcada es el tema del balance entre la dificultad y la recompensa. Dentro del TopDown, a medida que el jugador vaya avanzando a lo largo de la mazmorra, la dificultad de las salas aumentará y además al jugador podrá en malas condiciones, por lo que deberá tomar las decisiones de si seguir avanzando y conseguir alguna recompensa que le ayude con el boss o dejar pasar la oportunidad.
- Además, a medida que el jugador vaya avanzando por el mapa puede ser que en algunas salas venza a los enemigos sin recibir daño, en el caso que los enemigos suelten un corazón de vida y el jugador tenga la máxima vida, el corazón se quedará en esa sala sin recoger, donde el jugador deberá acordarse más delante en su partida por si pierde vida podrá volver a esta sala donde no recibió daño y recoger este corazón.
- Dentro de nuestro juego contamos con numerosos objetos. Estos no contienen ningún tipo de descripción así que el jugador deberá aprenderse las mejoras que garantizan los objetos si de verdad quiere sacarle potencial a cada uno de ellos.
- El boss final es uno de los enemigos más complicados del juego y se caracteriza por ser muy agresivo, por lo que en vez de intentar entender sus ataques es mejor atacarlo rápidamente para intentar vencer el juego. A lo mejor otros jugadores pueden pensar que es mejor aprenderse los patrones de ataque pero no es lo recomendable.
- Relacionada con el Scroll, una vez el jugador empieza la partida este es capaz de entrar a todos los niveles de Scroll, obviamente al acabar de empezar la partida solo podrá completar el primer nivel y todos los demás el jugador se dará cuenta que no tendrá las habilidades necesarias para pasárselo por lo que deberá jugar al juego para desbloquear nuevas habilidades y acordarse de que en el Scroll podrá utilizarlas.
- El segundo nivel del Scroll es el único sitio donde el jugador nunca podrá morir, debido a esto este nivel se construyó para que al principio del nivel el jugador estuviese más tranquilo. Eso se intenta conseguir cuando al principio del nivel abajo de todo se empieza con un lago de agua de color azul fluorescente que intenta transmitir tranquilidad al jugador. A medida que vas subiendo en ese mismo nivel aparecen dos caminos a elegir uno más sencillo que otro. El camino mása díficil se intenta demostrar con un pequeño lago de lava tapado indicando como peligro o dificultad.  
- Gracias a la existencia de la tienda, el jugador deberá barajar las diferentes opciones que tenga a comprar para entrar a la mazmorra la mejor manera posible. A medida que el jugador vaya jugando irá aprendiendo cuales son los mejores objetos a comprar. 

### CONTROLES

El juego se puede jugar tanto con teclado como con mando, dentro del juego aparecen los controles detallados al pulsar la tecla esc o el botón de Options.

### IDEA DEL ARTE

En cuanto al arte del juego, nos hemos inspirado en un estilo pixel-art, semejante a juegos como Enter The Gungeon o el Moonlighter, pero con tonalidades mas oscuras haciendo referencia al medievo.

Herramienta para paleta de colores: Adobe Color

Paleta para el lobby: Utilizamos tonos claros y alegres, como son el verde, amarillo, marrón(tierra) y azul claro. 

Paleta mazmorra: Utilizamos tonos más oscuros como son el azul oscuro, gris, negro(simboliza el vacío), naranja(lava), azul claro (para dar tranquilidad).

- Principios de niveles: 
En el Top-Down serán pequeñas habitaciones con enemigos donde el jugador deberá limpiar la habitación para poder avanzar.
En el Scroll-Lateral serán habitaciones más grandes donde el jugador deberá cruzar los diferentes obstáculos hasta llegar el final y coger la llave.  


### MENU INICIAL

El menu inicial del juego es muy basico, contiene dos botones, uno que inicia el juego y el otro que convierte el juego en pantalla completa.


### MENU JUEGO

El menu del juego contiene los controles tanto de teclado como de mando y ademas tiene otros 4 botones, uno que mutea y desmutea los sonidos
del juego, otro que hace que el juego se vuelva en pantalla completa, otro que bloquea o desbloquea la flecha de ayuda del jugador y un 
ultimo botón que simplemente cierra el menu.


### STATS DEL PERSONAJE

+ Vida
+ Velocidad de movimiento
+ Daño
+ Velocidad de flechas


### ALDEA (LOBBY)

- NPCS(Non Player Character):
+ Herrero, Hewg te permitirá comprar mejoras en su tienda como pueden ser tanto mejoras de vida, pociones, mana o mejoras pasivas.
+ General del cuartel, Roger, personaje que se encarga de hacer una pequeña introducción al juego y a la mazmorra contando un poco el desarrollo de la historia al jugador


### RECURSOS DEL JUGADOR

El jugador tiene a su disposicion varios objetos que actuan como recursos a lo largo de su aventura y son soltados de forma aleatoria
por los enemigos al morir, entre ellos tenemos:
+ Oro: es la moneda del juego, con ella puede comprar objetos en la tienda del herrero.
+ Vida: es un objeto que le otorga al jugador un corazon en caso de que le falte vida.
+ Poción de vida: un objeto acumulable que puede ser activada por el jugador en cualquier momento y le otorga un corazon de vida faltante.
+ Poción de mana: un objeto acumulable que puede ser activada por el jugador en cualquier momento y le otorga al jugador 25 de mana faltante.
+ Flechas: un objeto acumulable, funciona como municion para el ataque del arco.
+ Bolas de maná: todos los enemigos sueltan mana al morir y le regeneran al jugador una parte de su mana faltante, sirve como municion para
el ataque del baston.


### PERSONAJE PRINCIPAL

Caballero


### ENEMIGOS

Minotaur: tenemos dos tipos de minotauro, uno es estatico y cada ciertos segundos empieza a dar una vuelta y lanza 
flechas en todos los sentidos. El otro minotauro simplemente persigue al jugador y le hace danyo cuando choca con el.

Ant: Las ant son estaticas y hay dos tipos, la blanca que lanza flechas teledirigidas y la roja que lanza flechas
hacia la direccion del jugador y luego se paran y se lanzan nuevamente hacia el jugador.

Ice Elemental: son enemigos que se mueven en diagonal en cualquier direccion, de vez en cuando lanzan flechas hacia
todas sus direcciones no diagonales y cuando el jugador le golpea cambia un poco su direccion de vuelo.

Archer: un enemigo que lanza flechas y busca mantenerse a una distancia del jugador. Si el jugador se acerca mucho 
al enemigo, el arquero se volvera invulnerable y el jugador tendra que alejarse para que pueda golpearle de nuevo.

Musketeer: un enemigo que se mueve muy lento hacia el jugador pero cada cierto tiempo lanza una rafaga de flechas.

Mole: hay dos tipos de mole, el verde y el rojo, ambos copian los movimientos del jugador pero el verde se acerca 
lentamente mientras que el rojo es mas agresivo y se acerca mucho mas rapido.

Fire Ghost: son enemigos que el Ghost boss genera, persiguen lentamente al jugador.

Goblin King: un enemigo que se mueve en la direccion que desee y cada cierto tiempo lanza una rafaga de flechas
a su alrededor.

Mimic Chest: es un enemigo que aparece en la sala del cofre, a primera vista parece un cofre cualquiera pero si 
intentas abrirlo, atacara al jugador y le robara un punto de vida maximo o un objeto que no podran ser recuperados.

Wizard Boss: es el jefe por defecto en cada run, si lo matas y el jugador tiene las 4 llaves conseguidas en el scroll,
se desbloquea la sala del Ghost Boss. Este enemigo tiene dos fases, en la primera fase usa 3 ataques, el primero,
que lanza 4 bolas de fuego que se paran cada cierto tiempo y luego se lanzan en direccion del jugador pero sin ser
teledirigido; el segundo ataque del Wizard es una lluvia de meteoros, donde lanza bolas de fuego al aire y caen lentamente,
haciendole danyo al jugador si se encuentra en el sitio donde caen; el tercer ataque es una rafaga de bolas rojas que van 
en direccion del jugador. Cada 25% de vida que el jugador le quita al boss, se vuelve inmortal por unos segundos y genera
una bola de fuego que gira a su alrededor permanentemente. Cuando el boss tiene menos del 20% de la vida, se regenerara
completamente la vida una unica vez y sus ataques seran mas agresivos, con muchas mas bolas de fuego.

Ghost Boss: este es el boss verdadero y solo se mueve por los laterales del mapa donde el jugador no puede llegar, de vez
en cuando se intercambia de sitio y el jugador puede atacarle mas facil. Tiene varios ataques, el primero que lanza una 
rafaga de flechas de fuego lentas pero teledirigidas al jugador, otra que lanza una rafaga de bolas oscuras que a su vez
lanzan flechas oscuras en todas las direcciones que cuando explotan por tiempo, lanzan aun mas flechas oscuras,
otro ataque es que genere una horda de Fire Ghost, otro que lanza una bola de energia dirigida al medio del mapa que 
luego explota generando una cantidad masiva de flechas oscuras hacia todas las direcciones.


### OBJETOS

En el juego tenemos una cantidad de objetos pasivos que se pueden obtener a traves de los cofres, entre ellos tenemos:

+ Lightweight badge: una chapa que adhiere el jugador y le otorga velocidad de movimiento superior.
+ Crimson Mirror: un espejo que hace que las flechas del jugador reboten al chocar con paredes.
+ Gloves of Power: unos guantes que hacen que las flechas del jugador sean lanzadas con mas velocidad.
+ Ring of the Sages: un anillo que le otorgara al jugador un corazon de vida extra permanente.
+ Demonic Totem: un totem que le sube el ataque al jugador tanto fisico como a distancia.
+ Magical Icycle: le otorga al jugador un 25% de probabilidades que las flechas que lance congelen al enemigo por algunos segundos.
+ Cloak of Agility: le otorga al jugador invulnerabilidad durante la duracion de su dash.
+ Necklace of the Skies: convierte las flechas del jugador en flechas espectrales que pueden atravesar paredes.
+ Buffoon Hat: reduce el cooldown del dash del jugador.

Ademas, tenemos otros objetos pasivos:
+ Las llaves, que se encuentran en los niveles de scroll y sirven para desbloquear nuevas
habilidades del jugador si mata al boss y ademas, si se consiguen las cuatro llaves y se mata al boss desbloquean el portal para
llegar a la habitacion del boss final.
+ Las coronas, que se obtienen al matar al boss y teletransportan al jugador de vuelta a la aldea.



### UML del proyecto

![alt text](https://github.com/BrunoMC102/DVI.github.io/blob/main/UML/UMLfinal.PNG)


### PLATAFORMA DE COMUNICACION

Para ello hemos utilizado presentaciones creadas con PowerPoint, las cuales se pueden encontrar en la carpeta presentaciones del juego,
con ellas, hemos recibido el feedback adecuado para mejorar el juego y llevarlo al mejor estado posible tomando en cuenta el tiempo
limite para el desarrollo del mismo.


### DESCRIPCION DEL PROCESO

Para el desarrollo del proyecto, nos reuniamos todos los jueves en el laboratorio de la universidad para organizarnos y pensar en que es
lo que ibamos a tener listo para la siguiente semana, en caso de existir dudas despues de dicha reunion, nos poniamos en contacto mediante 
WhatsApp y a veces nos reuniamos por Discord. 

Durante el desarrollo existio una clara division de tareas entre los miembros del equipo, Felix se dedico sobre todo a realizar implementaciones
y a crear nuevas mecanicas dentro del juego, Alejandro se dedico al diseño de la aldea, de los niveles Top-Down y de dos niveles en el Scroll y 
luego implementarlos dentro del juego, los otros dos niveles de Scroll fueron hechos por Jose, que tambien se dedico a realizar las mecanicas de 
la aldea como la tienda y los NPC, a la vez que tambien realizo la gran mayoria de los recursos artisticos del juego como los sonidos y las interfaces.


### PLAN PARA HITOS RESTANTES

De cara a futuros hitos, tenemos planeadas varias mejoras para implementar en el juego. Las más importantes, y que implementaremos 
primero serán: 
+ Meter más sonidos y animaciones al juego.
+ Crear mejores menus del juego, incluyendo el menu principal y la interfaz del usuario en general.
+ Crear boss con varios ataques y fases.
+ Crear un tutorial.
+ Dentro de la aldea crear nuevos sitios y NPCS que le den vida al juego 

Desde aqui se podrá acceder al tutorial, y se podrán mejorar habilidades.
+ Crear diferentes tipos de salas: Tiendas/tesoro/desafio/secreta
+ Un arbol de habilidades, que se podrá ir mejorando desde el lobby.

Otras mejoras menos prioritarias que tambien tenemos planeado son:
+ Aumentar la cantidad de enemigos.
+ Aumentar la cantidad de objetos.
+ Crear zonas nuevas con estetica distinta, y enemigos distintos.

emlace al GDD:
https://docs.google.com/document/d/1VJKg9feMnnY7HcWO3QgpQhNLaDZVVkGWzVkmMB02zFo/edit?usp=sharing

### TESTING CON JUGADORES EXTERNOS AL PROYECTO
   + **¿Qué se prueba?**
      El objetivo principal de las pruebas es comprobar si un jugador real que no conoce nada sobre el desarrollo del juego, es capaz de utilizar las mecánicas y de
      pasar sin problema por los diferentes niveles tal y como los desarrolladores lo pensamos en un principio. 
      Esta experiencia nos sirve para aprender del jugador y retocar lo necesario para mejorar la experiencia, la jugabilidad y corregir errores inesperados que
      aparezcan por comportamientos que no hayamos tenido en cuenta a la hora de programar el juego.
   +  **¿Cómo se lleva a cabo una prueba?**
      Durante las pruebas, el jugador es el unico que tiene control del juego, haciendo que sea lo más cercano posible a una situación real. Pero a diferencia de esta,
      un miembro del equipo estará con el durante la experiencia para ayudar en caso de que no pueda avanzar o tenga dudas de cualquier tipo. Tanto el comportamiento
      del jugador como estas dudas son el material que nos sirve para hacer todos estos pequeños cambios en el juego.
   +   **Número de participantes**: 5
   +   **Guía de las pruebas**:
      Los jugadores empezarían en la aldea donde cada uno realizará la investigación pertinente antes de entrar a la mazmorra. Podrán conocer algo más del background del juego, visitar la tienda o simplemente acceder a la mazmorra.
      Una vez dentro de la mazmorra tendrán total libertad a realizar cualquier actividad tanto como probar el scroll o avanzar por el topdown. Como hemos indicado anteriormente en el caso que el jugador necesite ayuda con algo, el miembro del equipo que este supervisando la prueba, le ayudará con lo que necesite.
      Una vez matado el boss, en el caso que le haya faltado por descubrir algo el supervisor le indicará que cosas podría buscar.
   +   **Conclusiones**: (que funciona y que no)
      Después nuevos individuos probaron el juego, como esta indicado en la guía de las pruebas 
