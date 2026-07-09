// Base de Datos Oficial: 60+ Preguntas Sorpresa para "100 MINEROS DIJERON - EDICIÓN GRUPO BACIS"
// Diseñado para partidas completas de 30 a 40 minutos sin repetir preguntas.

const MINING_QUESTIONS = [
    // ==========================================
    // SECCIÓN 1: VIDA FAMILIAR, ESPOSA Y CASA DEL MINERO (1 - 15)
    // ==========================================
    {
        id: 1,
        question: "¿Qué es lo primero que le dice su esposa al minero cuando regresa a casa de su turno en Bacis?",
        answers: [
            { text: "¡MÉTETE A BAÑAR ANTES DE PISAR LA CAMA!", points: 39 },
            { text: "¿Y LA RAYA / EL CHEQUE COMPLETO?", points: 26 },
            { text: "¡QUÍTATE ESAS BOTAS LLENAS DE LODO!", points: 16 },
            { text: "¡QUÉ FLACO Y QUEMADO VIENES!", points: 11 },
            { text: "¡YA EXTRAÑABA QUE RONCARAS!", points: 8 }
        ]
    },
    {
        id: 2,
        question: "Menciona una excusa típica que da un minero cuando llega tarde a casa saliendo de turno:",
        answers: [
            { text: "SE PONCHÓ EL CAMIÓN EN LA SIERRA", points: 36 },
            { text: "HUBO JUNTA DE SEGURIDAD O CAMBIO DE TURNO", points: 27 },
            { text: "SE DESCOMPUSO EL SCOOPTRAM / MAQUINARIA", points: 18 },
            { text: "ME QUEDÉ DORMIDO EN EL TRAYECTO", points: 12 },
            { text: "NOS QUEDAMOS ACICALANDO EL TOPE", points: 7 }
        ]
    },
    {
        id: 3,
        question: "¿Qué es lo primero que busca un minero en su casa después de dos semanas en la mina?",
        answers: [
            { text: "SU CAMA PROPIA PARA DORMIR", points: 41 },
            { text: "UNA CERVEZA O HELADA BIEN FRÍA", points: 26 },
            { text: "COMIDA CASERA / CALDITO CALIENTE", points: 18 },
            { text: "ABRAZAR A LOS HIJOS Y A LA ESPOSA", points: 10 },
            { text: "EL SILLÓN Y LA TELEVISIÓN", points: 5 }
        ]
    },
    {
        id: 4,
        question: "¿De qué se queja más la esposa de un minero cuando él está de descanso en casa?",
        answers: [
            { text: "¡QUE SE LA PASA DURMIENDO TODO EL DÍA!", points: 38 },
            { text: "¡QUE DEJA ROPA Y BOTAS POR TODOS LADOS!", points: 28 },
            { text: "¡QUE QUIERE MANDAR EN CASA COMO SUPERINTENDENTE!", points: 18 },
            { text: "¡QUE HABLA CON PURO MODISMO MINERO!", points: 11 },
            { text: "¡QUE SOLO QUIERE IRSE CON LOS COMPAS!", points: 5 }
        ]
    },
    {
        id: 5,
        question: "¿Qué le piden los familiares o vecinos de regalo a un minero de Bacis cuando baja de la sierra?",
        answers: [
            { text: "¡UNA PEPITA DE ORO O PLATA!", points: 45 },
            { text: "QUESO DE LA SIERRA / MEZCAL", points: 24 },
            { text: "QUE LES PRESTE DINERO / RAYA", points: 18 },
            { text: "PIEDRAS BRILLANTES O CUARZOS", points: 9 },
            { text: "HISTORIAS DE APARECIDOS", points: 4 }
        ]
    },
    {
        id: 6,
        question: "Cuando el minero está en casa, ¿qué costumbre de la mina se le olvida quitarse?",
        answers: [
            { text: "HABLAR GRITANDO O CON MODISMOS", points: 34 },
            { text: "COMER RÁPIDO COMO SI FUERA AL CHIVO", points: 26 },
            { text: "LEVANTARSE DE MADRUGADA", points: 19 },
            { text: "BUSCAR EL CASCO ANTES DE SALIR", points: 13 },
            { text: "REVISAR QUE EL TECHO NO SE CAIGA", points: 8 }
        ]
    },
    {
        id: 7,
        question: "¿Qué plato casero le pide el minero a su esposa que le prepare apenas va llegando?",
        answers: [
            { text: "CARNE ASADA CON TORTILLAS DE HARINA", points: 38 },
            { text: "CALDO DE RES O POLLO BIEN CALIENTE", points: 25 },
            { text: "MENUDO / POZOLE", points: 18 },
            { text: "CHILAQUILES O ENCHILADAS", points: 12 },
            { text: "FRIJOLES CHARROS CON QUESO", points: 7 }
        ]
    },
    {
        id: 8,
        question: "¿Qué es lo que hace que un minero se levante corriendo de la cama cuando está en casa?",
        answers: [
            { text: "PENSAR QUE SE LE HIZO TARDE PARA EL TURNO", points: 42 },
            { text: "EL LLANTO DEL BEBÉ O LOS HIJOS", points: 24 },
            { text: "QUE LE DIGAN QUE YA ESTÁ LA COMIDA", points: 18 },
            { text: "UN RUIDO FUERTE / SOÑAR CON VOLADURA", points: 11 },
            { text: "UNA LLAMADA DEL SUPERVISOR", points: 5 }
        ]
    },
    {
        id: 9,
        question: "¿Qué compra el minero para consentir a su familia cuando llega con la raya?",
        answers: [
            { text: "CENA FUERA / TACOS O PIZZA", points: 36 },
            { text: "ROPA O TENIS PARA LOS HIJOS", points: 27 },
            { text: "DESPENSA BIEN SURTIDA", points: 19 },
            { text: "UN REGALO PARA LA ESPOSA", points: 12 },
            { text: "DULCES Y REGALITOS", points: 6 }
        ]
    },
    {
        id: 10,
        question: "Si la esposa revisa el celular del minero, ¿qué es lo que más encuentra?",
        answers: [
            { text: "MEMES DE MINEROS Y GRUPOS DE COMPAS", points: 44 },
            { text: "FOTOS DE MAQUINARIA O DEL SOCAVÓN", points: 26 },
            { text: "AVISOS DE TURNO Y SEGURIDAD", points: 18 },
            { text: "FOTOS DE LA FAMILIA", points: 12 }
        ]
    },
    {
        id: 11,
        question: "¿Cuál es la tarea del hogar que menos le gusta hacer al minero en sus días libres?",
        answers: [
            { text: "LAVAR TRASTES", points: 37 },
            { text: "LIMPIAR O TRAPEAR LA CASA", points: 26 },
            { text: "IR AL SUPERMERCADO / MANDADO", points: 19 },
            { text: "LAVAR LA ROPA / OVEROLES", points: 11 },
            { text: "ARREGLAR COSAS DEL JARDÍN", points: 7 }
        ]
    },
    {
        id: 12,
        question: "¿Qué consejo le da una madre a su hijo antes de irse a trabajar a la Mina de Bacis?",
        answers: [
            { text: "¡CUÍDATE MUCHO Y PONTE EL CASCO!", points: 46 },
            { text: "¡NO TE GASTES TODO EN FIESTA!", points: 25 },
            { text: "¡COME BIEN Y ABÍGATE!", points: 17 },
            { text: "¡REZALE A LA VIRGEN ANTES DE ENTRAR!", points: 12 }
        ]
    },
    {
        id: 13,
        question: "¿Qué cosa de la mina se termina llevando por error el trabajador en su maleta a casa?",
        answers: [
            { text: "LÁMPARA MINERA O BATERÍA", points: 41 },
            { text: "GUANTES DE TRABAJO", points: 27 },
            { text: "TAPONES AUDITIVOS O LENTES", points: 18 },
            { text: "MUESTRAS DE ROCA / MINERAL", points: 9 },
            { text: "HERRAMIENTA PEQUEÑA", points: 5 }
        ]
    },
    {
        id: 14,
        question: "¿Qué dice el minero cuando le preguntan por qué eligió esta noble profesión?",
        answers: [
            { text: "POR EL ORGULLO Y SACAR ADELANTE A LA FAMILIA", points: 48 },
            { text: "POR LA HERENCIA DE PADRES O ABUELOS", points: 25 },
            { text: "POR LOS SUELDOS Y PRESTACIONES", points: 17 },
            { text: "POR EL COMPAÑERISMO EN EL SOCAVÓN", points: 10 }
        ]
    },
    {
        id: 15,
        question: "¿Qué olor delata de inmediato que un minero acaba de llegar del trabajo?",
        answers: [
            { text: "TIERRA HÚMEDA / ROCA DE MINA", points: 43 },
            { text: "DIÉSEL O ACEITE DE MAQUINARIA", points: 28 },
            { text: "SUDOR DE JORNADA DURO", points: 18 },
            { text: "HUMO O EXPLOSIVO", points: 11 }
        ]
    },

    // ==========================================
    // SECCIÓN 2: MODISMOS, DICHOS Y ANÉCDOTAS (16 - 28)
    // ==========================================
    {
        id: 16,
        question: "Menciona algo que nunca puede faltar en el morral de un minero al entrar al turno:",
        answers: [
            { text: "EL LONCHE / TACOS / CHIVO", points: 38 },
            { text: "AGUA O ELECTROLITOS", points: 24 },
            { text: "LÁMPARA MINERA / BATERÍA", points: 16 },
            { text: "CIGARROS O REFRESCO", points: 11 },
            { text: "PAPEL HIGIÉNICO", points: 7 },
            { text: "GUANTES DE REPUESTO", points: 4 }
        ]
    },
    {
        id: 17,
        question: "¿Qué es lo primero que hace un minero cuando sale del turno en Mina Bacis?",
        answers: [
            { text: "BAÑARSE / QUITARSE LA TIERRA", points: 42 },
            { text: "DORMIR / DESCANSAR", points: 25 },
            { text: "LLAMAR O VER A LA FAMILIA", points: 15 },
            { text: "ECHARSE UNA CHELA / HELADA", points: 11 },
            { text: "COMER BIEN CALIENTITO", points: 7 }
        ]
    },
    {
        id: 18,
        question: "Frase o dicho clásico que escuchas entre compañeros mineros en el socavón:",
        answers: [
            { text: "¡AL CHIVO / YA HACE HAMBRE!", points: 34 },
            { text: "¡AGUAS CON EL TOPÓN / ADEME!", points: 22 },
            { text: "¡ESTÁ BUENA LA BONANZA!", points: 18 },
            { text: "¡SACA EL CLOCHI / PALANCA!", points: 15 },
            { text: "¡YA MERO SALIMOS DE TURNO!", points: 11 }
        ]
    },
    {
        id: 19,
        question: "Menciona un apodo clásico o forma de llamarle al compañero en la mina:",
        answers: [
            { text: "EL GAMBUSINO / BUSCÓN", points: 31 },
            { text: "EL BARRETERO", points: 24 },
            { text: "EL INGE / JEFAZO", points: 19 },
            { text: "EL CHATO / GÜERO / COMPA", points: 16 },
            { text: "EL TOPO", points: 10 }
        ]
    },
    {
        id: 20,
        question: "¿Qué bebida o alimento te da más energía para aguantar la jornada subterránea?",
        answers: [
            { text: "CAFÉ BIEN CARGADO", points: 35 },
            { text: "COCA-COLA / REFRESCO", points: 27 },
            { text: "BURRITOS / GORDITAS", points: 20 },
            { text: "BEBIDA ENERGÉTICA", points: 12 },
            { text: "CHOCOLATE / DULCE", points: 6 }
        ]
    },
    {
        id: 21,
        question: "Menciona una superstición o leyenda que todo minero cuenta sobre el interior de la mina:",
        answers: [
            { text: "EL DUENDE O FANTASMA DEL SOCAVÓN", points: 43 },
            { text: "QUE SILBAR ADENTRO ATRAE DERRUMBES", points: 26 },
            { text: "LA VETA DE ORO ENCANTADA", points: 18 },
            { text: "LA LLORONA DEL ARROYO", points: 9 },
            { text: "EL MINERO ANTIGUO APARECIDO", points: 4 }
        ]
    },
    {
        id: 22,
        question: "Si hicieran una película sobre los mineros de Bacis, ¿qué actor mexicano debería ser el protagonista?",
        answers: [
            { text: "PEDRO INFANTE O JORGE NEGRETE", points: 36 },
            { text: "DAMIAN ALCÁZAR", points: 25 },
            { text: "EUGENIO DERBEZ", points: 18 },
            { text: "JOAQUÍN COSIO (EL COCHILOCO)", points: 14 },
            { text: "MARIO MORENO 'CANTINFLAS'", points: 7 }
        ]
    },
    {
        id: 23,
        question: "¿Qué tema de conversación nunca falta entre mineros durante el almuerzo o lonche?",
        answers: [
            { text: "ANÉCDOTAS DE TRABAJO Y DERRUMBES", points: 37 },
            { text: "FUTBOL / EQUIPOS FAVORITOS", points: 26 },
            { text: "HISTORIAS DE ESPOSAS Y NOVIAS", points: 20 },
            { text: "PLANES PARA LAS VACACIONES", points: 11 },
            { text: "CHISMES DEL TURNO", points: 6 }
        ]
    },
    {
        id: 24,
        question: "¿Cuál es el pretexto más común cuando un minero pide un permiso al supervisor?",
        answers: [
            { text: "CITA MÉDICA O DEL IMSS", points: 44 },
            { text: "PROBLEMA O TRÁMITE FAMILIAR", points: 28 },
            { text: "FESTIVIDAD EN SU PUEBLO", points: 16 },
            { text: "SE LE DESCOMPUSO LA CAMIONETA", points: 12 }
        ]
    },
    {
        id: 25,
        question: "¿Qué es lo que más anima a un equipo minero a mitad de una jornada pesada?",
        answers: [
            { text: "SABER QUE YA FALTA POCO PARA SALIR", points: 38 },
            { text: "LA HORA DEL LONCHE / ALMUERZO", points: 28 },
            { text: "CHISTES Y BROMAS ENTRE COMPAÑEROS", points: 20 },
            { text: "ENCONTRAR BUEN MINERAL / VETA", points: 14 }
        ]
    },
    {
        id: 26,
        question: "¿Qué música es la que más suena en las camionetas o comedores de Bacis?",
        answers: [
            { text: "NORTEÑAS Y CORRIDOS", points: 44 },
            { text: "BANDA SINALOENSE", points: 27 },
            { text: "CUMBIAS PARA BAILAR", points: 18 },
            { text: "ROCK EN ESPAÑOL / CLÁSICOS", points: 11 }
        ]
    },
    {
        id: 27,
        question: "¿Qué cosa le presta un minero a otro compañero cuando se le olvida?",
        answers: [
            { text: "UN TACO O PARTE DEL LONCHE", points: 38 },
            { text: "HERRAMIENTA O LLAVE", points: 26 },
            { text: "GUANTES O TAPONES AUDITIVOS", points: 21 },
            { text: "CIGARROS", points: 15 }
        ]
    },
    {
        id: 28,
        question: "Menciona una cualidad que distingue a los verdaderos mineros de Durango:",
        answers: [
            { text: "TRABAJADORES Y VALIENTES", points: 46 },
            { text: "LEALES Y BUENOS COMPAÑEROS", points: 28 },
            { text: "ALEGRES Y BUEN HUMOR", points: 16 },
            { text: "ORGULLOSOS DE SU TIERRA", points: 10 }
        ]
    },

    // ==========================================
    // SECCIÓN 3: MINA SUBTERRÁNEA & MAQUINARIA (29 - 41)
    // ==========================================
    {
        id: 29,
        question: "Menciona una maquinaria pesada o equipo indispensable dentro de una mina subterránea:",
        answers: [
            { text: "SCOOPTRAM / CARGADOR (LHD)", points: 36 },
            { text: "JUMBO DE BARRENACIÓN", points: 28 },
            { text: "CAMIÓN DE BAJO PERFIL / DUMPER", points: 18 },
            { text: "MALACATE / WINCHE", points: 11 },
            { text: "VENTILADOR / DUCTO", points: 7 }
        ]
    },
    {
        id: 30,
        question: "¿Qué elemento es fundamental para asegurar el techo y evitar caídas de roca en el túnel?",
        answers: [
            { text: "ANCLAJES / PERNOS DE ROCA", points: 39 },
            { text: "MALLA ELECTROSOLDADA", points: 26 },
            { text: "ADEME METÁLICO O MADERA", points: 19 },
            { text: "CONCRETO LANZADO (SHOTCRETE)", points: 11 },
            { text: "DESQUINCHE / ACICALADO", points: 5 }
        ]
    },
    {
        id: 31,
        question: "Menciona una palabra técnica muy usada al hablar de la excavación subterránea:",
        answers: [
            { text: "FRENTE DE AVANCE / TOPE", points: 33 },
            { text: "TIRO O CHIMENEA", points: 25 },
            { text: "SOCAVÓN / GALERÍA", points: 18 },
            { text: "BARRENACIÓN / VOLADURA", points: 14 },
            { text: "CONTRAZO / RAMPA", points: 10 }
        ]
    },
    {
        id: 32,
        question: "¿Qué es lo que más revisa el supervisor al llegar al frente de trabajo en la mina?",
        answers: [
            { text: "VENTILACIÓN Y GASES", points: 34 },
            { text: "ACUESTE / ESTABILIDAD DEL TECHO", points: 28 },
            { text: "USO CORRECTO DE EPP", points: 18 },
            { text: "AVANCE DE BARRENOS", points: 12 },
            { text: "ORDEN Y LIMPIEZA", points: 8 }
        ]
    },
    {
        id: 33,
        question: "¿Cuál es el sonido más característico dentro de una mina en operación?",
        answers: [
            { text: "EL RUIDO DEL JUMBO / PERFORADORA", points: 37 },
            { text: "EL MOTOR DEL SCOOPTRAM", points: 25 },
            { text: "LA TRONADURA / VOLADURA", points: 19 },
            { text: "LOS VENTILADORES", points: 12 },
            { text: "LA SIRENA O ALARMA", points: 7 }
        ]
    },
    {
        id: 34,
        question: "¿Qué es lo más importante a verificar antes de realizar una voladura o tronadura?",
        answers: [
            { text: "DESALOJAR EL ÁREA Y AVISAR A TODOS", points: 48 },
            { text: "REVISAR CONEXIONES Y GUIAS", points: 26 },
            { text: "VERIFICAR VENTILACIÓN", points: 16 },
            { text: "CONTAR LAS CARGAS", points: 10 }
        ]
    },
    {
        id: 35,
        question: "Menciona un oficio o puesto clave dentro del socavón:",
        answers: [
            { text: "OPERADOR DE SCOOPTRAM / JUMBO", points: 36 },
            { text: "BARRETERO / PERFORISTA", points: 26 },
            { text: "SUPERVISOR DE TURNO", points: 19 },
            { text: "ELÉCTRICO / MECÁNICO DE MINA", points: 12 },
            { text: "TOPÓGRAFO", points: 7 }
        ]
    },
    {
        id: 36,
        question: "¿Qué se siente al bajar por primera vez a un nivel subterráneo profundo?",
        answers: [
            { text: "ADRENALINA Y RESPETO POR LA MINA", points: 41 },
            { text: "CAMBIO DE PRESIÓN EN LOS OÍDOS", points: 26 },
            { text: "OSCURIDAD Y OSCILACIÓN DE LUZ", points: 19 },
            { text: "CALOR O HUMEDAD", points: 14 }
        ]
    },
    {
        id: 37,
        question: "¿Qué señal de luces hacen los operadores de maquinaria para avisar el paso en un túnel?",
        answers: [
            { text: "APAGAR Y ENCENDER LÁMPARAS", points: 45 },
            { text: "TOCAR EL CLAXON / SIRENA", points: 31 },
            { text: "MOVER LA LÁMPARA DE CASCO EN CÍRCULOS", points: 16 },
            { text: "DETENERSE EN EL REFUGIO", points: 8 }
        ]
    },

    // ==========================================
    // SECCIÓN 4: PLANTA DE BENEFICIO & METALURGIA (42 - 50)
    // ==========================================
    {
        id: 38,
        question: "Menciona una etapa o equipo clave dentro del proceso de una Planta de Beneficio:",
        answers: [
            { text: "MOLIENDA (MOLINO DE BOLAS)", points: 35 },
            { text: "CELDAS DE FLOTACIÓN", points: 27 },
            { text: "TRITURADORA / QUEBRADORA", points: 19 },
            { text: "ESPESADORES / FILTRADO", points: 11 },
            { text: "PRESA DE JALAS / RELAVES", points: 8 }
        ]
    },
    {
        id: 39,
        question: "¿Cuáles son los metales preciosos más codiciados que se procesan en minas como Bacis?",
        answers: [
            { text: "ORO (AU)", points: 46 },
            { text: "PLATA (AG)", points: 38 },
            { text: "PLOMO / ZINC", points: 11 },
            { text: "COBRE", points: 5 }
        ]
    },
    {
        id: 40,
        question: "¿Qué reactivo o insumo es fundamental en el proceso metalúrgico de flotación o recuperación?",
        answers: [
            { text: "ESPUMANTES / COLECTORES", points: 34 },
            { text: "CAL / CONTROLADOR DE PH", points: 26 },
            { text: "AGUA INDUSTRIAL", points: 21 },
            { text: "BOLAS DE ACERO PARA MOLINO", points: 12 },
            { text: "CYANURO O REACTIVOS ESPECIALES", points: 7 }
        ]
    },
    {
        id: 41,
        question: "¿Qué indicador celebra todo el equipo cuando sale alto en el reporte de la planta?",
        answers: [
            { text: "LEY DEL CONCENTRADO / LEY DE ORO", points: 41 },
            { text: "PORCENTAJE DE RECUPERACIÓN", points: 31 },
            { text: "TONELAJES PROCESADOS", points: 18 },
            { text: "CERO ACCIDENTES EN EL MES", points: 10 }
        ]
    },
    {
        id: 42,
        question: "¿Qué ruido es el que domina en el área de molienda de la planta?",
        answers: [
            { text: "EL GOLPEO DE LAS BOLAS DE ACERO", points: 52 },
            { text: "LAS BANDAS TRANSPORTADORAS", points: 24 },
            { text: "LAS BOMBAS DE PULPA", points: 15 },
            { text: "EL MOTOREDUCTOR DEL MOLINO", points: 9 }
        ]
    },
    {
        id: 43,
        question: "¿Qué busca el operador de flotación en la espuma de las celdas?",
        answers: [
            { text: "EL COLOR Y BRILLO DEL MINERAL", points: 44 },
            { text: "EL TAMAÑO DE LA BURBUJA", points: 28 },
            { text: "LA VELOCIDAD DE DESBORDAMIENTO", points: 18 },
            { text: "EL NIVEL DE LA PULPA", points: 10 }
        ]
    },

    // ==========================================
    // SECCIÓN 5: GEOLOGÍA & EXPLORACIÓN (44 - 52)
    // ==========================================
    {
        id: 44,
        question: "Menciona un término geológico que todo minero conoce al buscar mineral:",
        answers: [
            { text: "VETA / FILÓN", points: 44 },
            { text: "TEPETATE / ESTÉRIL (GANGA)", points: 24 },
            { text: "FALLA O FRACTURA (ABRA)", points: 16 },
            { text: "LEY DEL MINERAL", points: 10 },
            { text: "NÚCLEO DE BARRENACIÓN", points: 6 }
        ]
    },
    {
        id: 45,
        question: "¿Qué herramienta u objeto nunca le falta a un Geólogo en su recorrido?",
        answers: [
            { text: "MARTILLO O PICOTA DE GEÓLOGO", points: 42 },
            { text: "LUPA CUENTAHÍLOS", points: 24 },
            { text: "BRÚJULA / GPS", points: 18 },
            { text: "LIBRETÓN DE CAMPO / MAPA", points: 11 },
            { text: "BOLSAS DE MUESTRA", points: 5 }
        ]
    },
    {
        id: 46,
        question: "¿Cómo le llaman los mineros cuando una veta se pone muy rica en oro y plata?",
        answers: [
            { text: "¡ESTÁ EN BONANZA / CLAVO RICO!", points: 48 },
            { text: "VETA ANCHA / PURA PURA", points: 26 },
            { text: "MINERAL ALTA LEY", points: 16 },
            { text: "ORO VISTO", points: 10 }
        ]
    },
    {
        id: 47,
        question: "Menciona un mineral sulfurado o roca común en yacimientos polimetálicos de México:",
        answers: [
            { text: "PIRITA (ORO DE LOS TONTOS)", points: 35 },
            { text: "CUARZO BLANCO", points: 27 },
            { text: "GALENA / ESFALERITA", points: 21 },
            { text: "ARGENTITA (PLATA)", points: 11 },
            { text: "CALCITA", points: 6 }
        ]
    },
    {
        id: 48,
        question: "¿Qué hace un geólogo apenas toma un trozo de roca del frente?",
        answers: [
            { text: "MOJARLO PARA VER MEJOR EL MINERAL", points: 41 },
            { text: "MIRARLO CON LA LUPA", points: 31 },
            { text: "GOLPEARLO CON LA PICOTA", points: 18 },
            { text: "GUARDARLO EN LA BOLSA DE MUESTRA", points: 10 }
        ]
    },

    // ==========================================
    // SECCIÓN 6: SEGURIDAD, EPP Y SALUD MINERA (49 - 60)
    // ==========================================
    {
        id: 49,
        question: "Menciona una pieza obligatoria del EPP (Equipo de Protección Personal) para entrar a mina:",
        answers: [
            { text: "CASCO DE SEGURIDAD", points: 34 },
            { text: "BOTAS CON CASQUILLO", points: 26 },
            { text: "LÁMPARA MINERA Y AUTORRESCATADOR", points: 19 },
            { text: "LENTES DE PROTECCIÓN", points: 13 },
            { text: "RESPIRADOR / MASCARILLA", points: 8 }
        ]
    },
    {
        id: 50,
        question: "¿Qué regla de oro de seguridad es sagrada en Mina Bacis?",
        answers: [
            { text: "ACICALAR / REVISAR EL TECHO", points: 38 },
            { text: "USAR SIEMPRE EL EPP COMPLETO", points: 27 },
            { text: "RESPETAR ÁREAS DE TRONADURA", points: 18 },
            { text: "REPORTAR ACTOS INSEGUROS", points: 11 },
            { text: "CERO ALCOHOL EN LABORES", points: 6 }
        ]
    },
    {
        id: 51,
        question: "Menciona algo que causa que suene una alarma o advertencia en la mina:",
        answers: [
            { text: "AVISO DE VOLADURA / TRONADURA", points: 43 },
            { text: "MONÓXIDO DE CARBONO / GASES", points: 28 },
            { text: "MOVIMIENTO DE MAQUINARIA PESADA", points: 17 },
            { text: "FALLA ELÉCTRICA O VENTILACIÓN", points: 12 }
        ]
    },
    {
        id: 52,
        question: "¿Qué es lo que más se recomienda para mantener una buena hidratación en el turno?",
        answers: [
            { text: "TOMAR SUEROS O ELECTROLITOS", points: 44 },
            { text: "BEBER AGUA CONSTANTEMENTE", points: 36 },
            { text: "EVITAR EL EXCESO DE CAFÉ O AZÚCAR", points: 12 },
            { text: "DESCANSAR EN ZONAS FRESCA", points: 8 }
        ]
    },
    {
        id: 53,
        question: "¿Qué se debe revisar en el autorrescatador antes de bajar a interior mina?",
        answers: [
            { text: "QUE EL SELLO ESTÉ INTACTO", points: 45 },
            { text: "QUE LA FECHA DE VIGENCIA ESTÉ BIEN", points: 27 },
            { text: "QUE LA CARCASA NO ESTÉ GOLPEADA", points: 18 },
            { text: "QUE ESTÉ BIEN SUJETO AL CINTURÓN", points: 10 }
        ]
    },
    {
        id: 54,
        question: "¿Qué frase repiten los instructores en cada plática de seguridad de 5 minutos?",
        answers: [
            { text: "¡TU FAMILIA TE ESPERA EN CASA!", points: 49 },
            { text: "¡LA SEGURIDAD ES PRIMERO!", points: 28 },
            { text: "¡SI NO ES SEGURO, NO LO HAGAS!", points: 15 },
            { text: "¡CUIDA A TU COMPAÑERO!", points: 8 }
        ]
    },
    {
        id: 55,
        question: "¿Qué es lo que hace un buen minero cuando ve una condición insegura en el túnel?",
        answers: [
            { text: "ACICALA O PARALIZA EL ÁREA INMEDIATAMENTE", points: 43 },
            { text: "AVISA AL SUPERVISOR Y COMPAÑEROS", points: 31 },
            { text: "COLOCA CINTA O SEÑALIZACIÓN", points: 16 },
            { text: "REGISTRA EN LA BITÁCORA", points: 10 }
        ]
    },
    {
        id: 56,
        question: "¿Qué equipo te protege los oídos cerca de un jumbo o molino?",
        answers: [
            { text: "TAPONES AUDITIVOS DE INSERCIÓN", points: 51 },
            { text: "OREJERAS DE DIADEMA / CASCO", points: 34 },
            { text: "DOBLE PROTECCIÓN AUDITIVA", points: 15 }
        ]
    },
    {
        id: 57,
        question: "¿Qué es lo primero que se hace al ingresar a un refugio minero en caso de emergencia?",
        answers: [
            { text: "CERRAR HERMÉTICAMENTE LA PUERTA", points: 46 },
            { text: "ABRIR EL SISTEMA DE AIRE LIMPIO", points: 29 },
            { text: "MANTENER LA CALMA Y PASAR LISTA", points: 16 },
            { text: "ENCENDER COMUNICACIÓN CON SUPERFICIE", points: 9 }
        ]
    },
    {
        id: 58,
        question: "¿Cuál es el mejor hábito para evitar fatiga en un turno largo?",
        answers: [
            { text: "DORMIR BIEN ANTES DE ENTRAR", points: 48 },
            { text: "ALIMENTARSE SALUDABLEMENTE", points: 26 },
            { text: "HACER PAUSAS Y ESTIRAMIENTOS", points: 16 },
            { text: "MANTENERSE HIDRATADO", points: 10 }
        ]
    },
    {
        id: 59,
        question: "¿Qué orgullo siente todo minero de Grupo Bacis al terminar un turno seguro?",
        answers: [
            { text: "REGRESAR CON BIEN A CASA CON SU FAMILIA", points: 54 },
            { text: "CUMPLIR CON LA META DEL DÍA", points: 26 },
            { text: "EL TRABAJO EN EQUIPO LOGRADO", points: 13 },
            { text: "APORTAR A LA MINERÍA DE MÉXICO", points: 7 }
        ]
    },
    {
        id: 60,
        question: "¿Cuál es la respuesta dorada para ganar el juego de hoy?",
        answers: [
            { text: "¡ORGULLOSAMENTE MINEROS DE GRUPO BACIS!", points: 55 },
            { text: "¡SEGURIDAD Y FAMILIA PRIMERO!", points: 28 },
            { text: "¡A GANAR LAS 5 RONDAS!", points: 17 }
        ]
    },
    {
        id: 61,
        question: "¿De quién es la culpa cuando la ley del mineral sale baja según los de la mina?",
        answers: [
            { text: "¡DE LOS GEÓLOGOS QUE MARCARON PURA TIERRA!", points: 38 },
            { text: "¡DE LOS DE LA PLANTA QUE SE DURMIERON!", points: 28 },
            { text: "¡DE SEGURIDAD POR SU PLÁTICA LARGA!", points: 18 },
            { text: "¡DE LA VETA QUE SE HIZO CHIQUITA!", points: 11 },
            { text: "¡DEL SUPERINTENDENTE POR PRESIONAR!", points: 5 }
        ]
    },
    {
        id: 62,
        question: "¿Qué es lo que más le molesta a un Geólogo de Bacis en un recorrido subterráneo?",
        answers: [
            { text: "QUE EL OPERADOR HAYA TAPADO LA VETA CON TEPETATE", points: 36 },
            { text: "QUE LE DIGAN QUE SU BRÚJULA NO SIRVE", points: 26 },
            { text: "PERDER SU PICOTA O MARTILLO PREFERIDO", points: 20 },
            { text: "QUE LE PREGUNTEN ¿DÓNDE ESTÁ EL ORO VISTO?", points: 13 },
            { text: "QUE LA MUESTRA ESTÉ MOJADA CON AGUA SUCIA", points: 5 }
        ]
    },
    {
        id: 63,
        question: "Cuando un geólogo de exploración camina por el cerro, ¿qué es lo más chistoso que le confunden que está haciendo?",
        answers: [
            { text: "BUSCANDO AGUA O TESOROS ESCONDIDOS", points: 41 },
            { text: "DANDO EL ROL O PASEANDO SIN HACER NADA", points: 27 },
            { text: "JUNTANDO PIEDRITAS BRILLANTES PARA SU NOVIA", points: 18 },
            { text: "HABLANDO SOLO CON LOS CERROS", points: 9 },
            { text: "JUGANDO AL EXPLORADOR", points: 5 }
        ]
    },
    {
        id: 64,
        question: "¿Cómo identifican los geólogos de Bacis un mineral o roca en campo?",
        answers: [
            { text: "REVISAN CON LA LUPA CUENTAHÍLOS", points: 38 },
            { text: "PRUEBAN SU DUREZA CON LA PICOTA", points: 28 },
            { text: "OBSERVAN SU COLOR Y BRILLO", points: 18 },
            { text: "HACEN LA PRUEBA DEL ÁCIDO / REACCIÓN", points: 11 },
            { text: "MARCAN LA MUESTRA PARA LABORATORIO", points: 5 }
        ]
    },
    {
        id: 65,
        question: "¿De qué se queja el geólogo cuando entra a la oficina de mina?",
        answers: [
            { text: "¡DE QUE LOS MINEROS NO LEEN SUS MAPAS!", points: 38 },
            { text: "¡DE QUE HACE MUCHO CALOR EN EL SOCAVÓN!", points: 27 },
            { text: "¡DE QUE LE PERDIERON LAS MUESTRAS!", points: 18 },
            { text: "¡DE QUE SE ACABÓ EL CAFÉ CARGADO!", points: 12 },
            { text: "¡DE QUE EL INGE DE MINAS NO LO ENTIENDE!", points: 5 }
        ]
    }
];

