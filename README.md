# Knightmares

Nombre del Juego: KnightMares
Nombre del Grupo : 6

Dirección del juego: https://brunomc102.github.io/DVI.github.io/


IDEA GENERAL

Este juego se basa en un juego Roguelike que combinará las vistas de Side-Lateral y Top-Down.
En el Scroll-Lateral el personaje podrá andar y saltar intentando atravesar una pequeña habitación desafiante para volver al mapa en Top-Down.

En el Top-Down el personaje deberá pasar habitaciones llenas de enemigos para llegar al final de la mazmorra. En algunas habitaciones tendrá la posibilidad de acceder a ciertas zonas concretas para pasar al SideLateral. 


-MECANICAS:

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

DINAMICAS:
Gracias a las mejoras que se van otorgando el jugador podrá desarrollar nuevas dinámicas gracias a los cambios
en el gameplay a través de las mejoras que se le otorguen:
-Disparar a través de superficies
-Mejorar el esquive para evitar flechas


MENU INICIAL:
El menu inicial del juego es muy basico, contiene dos botones, uno que inicia el juego y el otro que convierte el juego en pantalla completa.


MENU JUEGO:
El menu del juego contiene los controles tanto de teclado como de mando y ademas tiene otros 4 botones, uno que mutea y desmutea los sonidos
del juego, otro que hace que el juego se vuelva en pantalla completa, otro que bloquea o desbloquea la flecha de ayuda del jugador y un 
ultimo boton que simplemente cierra el menu.


STATS DEL PERSONAJE:

Vida
Velocidad de movimiento
Daño
Velocidad de flechas:


ALDEA (LOBBY):

-Tienda 
-NPCS(Non Player Character):
Herrero(te permitirá realizar mejoras respecto a las armas)
General del cuartel (hablará sobre tu historia)


RECURSOS DEL JUGADOR:
El jugador tiene a su disposicion varios objetos que actuan como recursos a lo largo de su aventura y son soltados de forma aleatoria
por los enemigos al morir, entre ellos tenemos:
Oro: es la moneda del juego, con ella puede comprar objetos en la tienda del herrero.
Vida: es un objeto que le otorga al jugador un corazon en caso de que le falte vida.
Pocion de vida: un objeto acumulable que puede ser activada por el jugador en cualquier momento y le otorga un corazon de vida faltante.
Pocion de mana: un objeto acumulable que puede ser activada por el jugador en cualquier momento y le otorga al jugador 25 de mana faltante.
Flechas: un objeto acumulable, funciona como municion para el ataque del arco.
Bolas de mana: todos los enemigos sueltan mana al morir y le regeneran al jugador una parte de su mana faltante, sirve como municion para
el ataque del baston.


PERSONAJE PRINCIPAL:
Caballero 


ENEMIGOS:
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


OBJETOS:
En el juego tenemos una cantidad de objetos pasivos que se pueden obtener a traves de los cofres, entre ellos tenemos:

Lightweight badge: una chapa que adhiere el jugador y le otorga velocidad de movimiento superior.
Crimson Mirror: un espejo que hace que las flechas del jugador reboten al chocar con paredes.
Gloves of Power: unos guantes que hacen que las flechas del jugador sean lanzadas con mas velocidad.
Ring of the Sages: un anillo que le otorgara al jugador un corazon de vida extra permanente.
Demonic Totem: un totem que le sube el ataque al jugador tanto fisico como a distancia.
Magical Icycle: le otorga al jugador un 25% de probabilidades que las flechas que lance congelen al enemigo por algunos segundos.
Cloak of Agility: le otorga al jugador invulnerabilidad durante la duracion de su dash.
Necklace of the Skies: convierte las flechas del jugador en flechas espectrales que pueden atravesar paredes.
Buffoon Hat: reduce el cooldown del dash del jugador.

Ademas, tenemos otros objetos pasivos:
Las llaves, que se encuentran en los niveles de scroll y sirven para desbloquear nuevas
habilidades del jugador si mata al boss y ademas, si se consiguen las cuatro llaves y se mata al boss desbloquean el portal para
llegar a la habitacion del boss final.
Las coronas, que se obtienen al matar al boss y teletransportan al jugador de vuelta a la aldea.


CONTROLES:
El juego se puede usar tanto con teclado como con mando, dentro del juego aparecen los controles detallados al pulsar la tecla esc.


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

emlace al GDD:
https://docs.google.com/document/d/1VJKg9feMnnY7HcWO3QgpQhNLaDZVVkGWzVkmMB02zFo/edit?usp=sharing
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
