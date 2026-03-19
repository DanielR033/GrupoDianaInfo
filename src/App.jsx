import React, { useMemo, useState } from "react";
import {
  TrendingUp,
  ClipboardCheck,
  Users,
  Layers,
  ShieldCheck,
  Building2,
  Workflow,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Target,
  ArrowRight,
  Sparkles,
  Timer,
  Info,
  GitBranch,
} from "lucide-react";

import organigramaCDO from "./assets/piramide.jpeg";
import dqColumnsRaw from "./assets/qualitydata/dq_columns.csv?raw";
import dqDatasetRaw from "./assets/qualitydata/dq_dataset.csv?raw";
import dqMetadataRaw from "./assets/qualitydata/dq_metadata.csv?raw";

/**
 * INFOGRAFÍA LARGA (Style A) – Fase 3 en ejecución | Grupo Diana
 * - Colores: rojo/azul/blanco
 * - Sin dependencias externas
 * - 1 solo export default
 */

// ==============================
// Brand (Grupo Diana)
// ==============================
const brand = {
  primary: "#E1261C", // rojo
  secondary: "#004B8D", // azul
  bgTop: "#ffffff",
  bgBottom: "#f6f8fb",
};

// ==============================
// Data (según tu último mensaje)
// ==============================
const KPIS = {
  proyectoTotal: { esperado: 100.0, real: 98.9, spi: 98.9 },
  fase2: { esperado: 78.0, real: 53.0, spi: 68 },
  cambio: { esperado: 87.0, real: 81.0, spi: 93 },
};

const CAMBIO = {
  accionesImplementadas: {
    comunicaciones: [
      "Webinars de alineación de expectativas y objetivos (425 participantes) + comunicados de refuerzo",
      "Podcast con invitado internacional sobre Gobierno de Datos",
    ],
    movilizacion: [
      "Entrevistas personalizadas con audiencias clave (encuesta ADKAR); 100% participación",
      "Diseño de la estrategia de abordaje para los diferentes roles del proyecto",
    ],
    capacitacion: [
      "Diseño de la malla curricular: general y por roles (Data Owner, Steward, Custodian y CDO)",
      "2 sesiones de capacitación para equipo TI en Gobierno de Datos (100% participación)",
      "Sesión básica de datos para el Centro de Formación Casanare (100% participación)",
    ],
  },
  proximosPasos: [
    "Grupo focal para presentar roles (movilización) — 28/01/2026",
    "Comunicado de roles (comunicación) — 30/01/2026",
    "Reconocimiento: entrega de identificador del rol (movilización) — 04/02/2026",
    "Comunicado de roles formalizados para dominio Agricultor (comunicación) — 06/02/2026",
    "Habilitar comités tácticos y operativos (movilización)",
    "Capacitación especializada Data Owner (09–13/02/2026)",
    "Capacitación especializada Data Steward y Custodian (11/02/2026)",
    "Taller Train the Trainers (habilidades blandas) — 16/02/2026",
    "Comunicados de tips de procesos desde 27/02/2026 según necesidad",
    "Curso virtual de política de Gobierno de Datos para todos los roles",
    "Seguimientos del rol (comités táctico y operativo)",
  ],
  riesgo:
    "El paso a la acción es el punto crítico esperado: si no se sostiene el seguimiento y la priorización, el Gobierno pierde tracción en la operación.",
  mensajeGrande: "Mensaje de bienvenida por parte de Andrés Murra formalizando el rol.",
};

const CIERRE_FASE2 = {
  arquitectura: [
    "Arquitectura To‑Be cerrada (incluye arquitectura de transición)",
    "Lineamientos para centralización vs. federación por empresas del grupo",
    "Documento de arquitectura validado para ejecución",
  ],
  modeloOperativo: [
    "Documento del modelo operativo finalizado",
    "Modelo operativo híbrido: centralización a nivel Grupo + federación por empresas",
    "Comités definidos (Directivo, Táctico, Operativo) y su frecuencia/objetivo",
    "CDO como Oficina (roles distribuidos), no un cargo individual",
  ],
  procedimientosRoadmap: [
    "Roadmap definido para implementación por olas (alineado al plan del proyecto)",
    "Procedimientos base alineados al As‑Is (flujos, actores, momentos clave)",
  ],
  mensajeClave:
    "Transición clara: de Fase 2 (diseño) a Fase 3 (operación real). El Gobierno ya opera con comités activos, decisiones y activos en producción.",
};

const CDO_OFFICE = {
  title: "CDO Office (Oficina de Gobierno del Dato)",
  roles: [
    "Chief Data Analytics Officer (CDAO) - Fernando Escorcia",
    "Data Governance Director (DGD) - Juan Bolivar",
    "Data Architecture & Life Cycle Manager - Jose Valdes",
    "Data Quality & Trust Lead - Jose VAldes",
    "Metadata & Catalog Lead - Juan Bolivar",
    "Data Security & Privacy Officer - Martha Eraso",
    "Democratization Lead - Martha Eraso",
    "Data Custodian / Ingeniería (TI)",
    "Data Engineering / Analítica / Desarrollo",
    "Gestión del Cambio",
  ],
  comites: [
    { name: "Comité Directivo", desc: "Sponsor ejecutivo; prioriza y destraba" },
    { name: "Comité Táctico", desc: "Data Stewards; define reglas y estándares" },
    { name: "Comité Operativo", desc: "Equipos ejecutores; implementa y monitorea" },
  ],
};

const FASE3_TESORERIA_SIEMBRA = [
  {
    n: 1,
    prio: "Alta",
    title: "Declarar formalmente el Dominio Agricultor y sus dimensiones",
    bullets: [
      "Formalización del dominio y dimensiones clave",
      "Incluye información de Clientes y Proveedores",
      "Alineación con el modelo declarativo y operativo",
    ],
  },
  {
    n: 2,
    prio: "Alta",
    title: "Capacitaciones de Gobierno de Datos para TI",
    bullets: [
      "Fortalecer adopción operativa del modelo",
      "Asegurar entendimiento de roles y responsabilidades",
    ],
  },
  {
    n: 3,
    prio: "Alta",
    title: "Definir políticas de acceso al dato",
    bullets: [
      "Reglas formales de acceso y seguridad",
      "Alineación con clasificación de sensibilidad",
    ],
  },
  {
    n: 4,
    prio: "Alta",
    title: "Producto de datos definido: Maestro Agricultor",
    bullets: [
      "Trasciende maestro cliente y maestro proveedor",
      "Beneficio: reutilización y no reproceso en múltiples dominios",
      "Activo reutilizable que habilita decisiones con trazabilidad",
    ],
  },
  {
    n: 5,
    prio: "Media",
    title: "GLUE JOB genérico para extracción SAP e ingesta Bronze (AWS)",
    bullets: [
      "Extracción de fuentes SAP",
      "Ingesta Bronze para maestro proveedores",
      "Nutrir dominios Agricultor y Proveedor",
    ],
  },
  {
    n: 6,
    prio: "Media",
    title: "Sistema de perfilamiento de tablas",
    bullets: [
      "Estadísticas descriptivas de columnas y filas",
      "Generación de KPI's de calidad",
    ],
  },
  {
    n: 7,
    prio: "Media",
    title: "Catalogación Bronze Agricultor",
    bullets: [
      "Crawlers y Glue Data Catalog",
      "Visibilidad y trazabilidad del dominio",
    ],
  },
];

const ROADMAP_CIERRE = {
  quedaParaCerrar: [
    "Priorización y cierre de planes críticos organizacionales",
    "Medición y seguimiento recurrente de los planes de mitigación",
  ],
  senalesContinuidad: [
    "Comité de Gobierno activo: sesiona y decide sobre dominios, arquitectura y prioridades",
    "4 KCI identificados con 48 actividades de mitigación",
    "Dominios clasificados y priorizados",
    "Estructura y roles definidos con nivel de madurez",
    "Evolución de arquitectura y herramientas en marcha",
  ],
  mensajeFinal:
    "El Gobierno del Dato ya está en marcha: es operativo, medible y con control. Evoluciona de forma continua y gobernada a medida que se incorporan dominios, procesos y decisiones basadas en datos.",
  proximoHito:
    "Sostener el paso a la acción: operación continua, seguimiento de mitigaciones y ejecución del dominio Agricultor como caso ejemplar.",
};

const CALIDAD_TRANSICION = {
  contexto:
    "El dashboard de Power BI sigue pendiente de entrega; esta vista dentro de la presentación lo sustituye temporalmente para exponer métricas de calidad, avance y cobertura de metadatos en comité.",
  logros: [
    "Completado - Azurian: llevar a Silver las tablas maestra_pesaje, consolidado_de_liquidacion_paddy y cartera_acreedores.",
    "Completado - Analítica: entrega de filtro en la fuente de proveedores para obtener agricultores.",
    "Completado - Azurian: publicación en Gold del producto agricultor_360 a partir de proveedores_datos_basicos filtrado por proveedor_id.",
    "Completado - Azurian/Gobierno: creación de accesos y asignación de roles en AWS (12/03/2026).",
    "Completado - Azurian: registro de metadatos en fuente/base de datos para generar indicadores desde AWS.",
    "Completado - Azurian: ampliación del profiling de calidad para obtener métricas dentro del dashboard de gobierno de datos.",
    "Completado - Azurian: entrega de documentación de implementación Fase 3.",
  ],
  pendientes: [
    "Pendiente - Analítica: script de cruce para construir clasificacion_de_agricultores en Gold con agricultor_360, maestra_pesaje y consolidado_de_liquidacion_paddy.",
    "Pendiente - Azurian: entrega final del dashboard de gobierno de datos en Power BI.",
  ],
};

const CIERRE_FINAL = {
  avanceReal: 98.9,
  avanceEsperado: 100,
  gap: -1.1,
  pendientesCierre: [
    "Taller de lecciones aprendidas",
    "Subir toda la documentación de entregables y documentos soporte",
    "Generar prefactura (mañana)",
    "Facturar la próxima semana",
    "Firmar acta de cierre",
  ],
  logrosCambio: [
    "2 sesiones de Gobierno de Datos enfocadas al equipo IT",
    "Encuentro con Centro de Formación Casanare para presentar roles",
    "3 webinars sobre básicos de datos para iniciativas de siembra",
    "Capacitaciones por roles: 2 (Data Custodian+Data Engineer), 2 (Data Steward), 1 (Data Owner) y 1 agendada para lunes 02 de marzo",
    "Comités operativos y tácticos habilitados",
    "Comunicado de roles específicos enviado",
    "ADKAR (2 respuestas): pasaron de observadores pasivos a promotores",
  ],
  pendientesCambio: [
    "Taller de train the trainers para el equipo del Centro de Formación Casanare",
    "Grabación de video a Andrés Murra dando bienvenida a los nuevos roles del Gobierno de Datos.",
    "Acompañamiento a las sesiones de capacitación especializada por procesos o políticas.",
  ],
  tecnicaResumenBullets: [
    "Caso implementado: Maestro de Proveedores (5 tablas SAP + 1 query negocio)",
    "Productos Gold: proveedor_por_sociedad, proveedor_por_datos_basicos, proveedor_por_emails, proveedor_por_direcciones, proveedor_por_datos_bancarios y proveedor_360",
    "Framework de pipelines reutilizable: SAP→Bronze (incremental + auditoría), Bronze→Silver, Silver→Maestro, Silver→Gold (full/incremental/merge)",
    "Catalogación automatizada en Glue Data Catalog vía plantilla CSV + estándares de naming",
    "Profiling y KPIs de calidad (completitud, unicidad, consistencia, duplicidad) + tablero Power BI",
    "Portal/Marketplace en AWS DataZone con publicación de productos Gold y glosario inicial",
  ],
  quickWins: [
    {
      titulo: "Consolidar Proveedor 360",
      objetivo: "Cerrar reglas maestras y unicidad",
      entregable: "Proveedor 360 certificado y publicado",
      impactoIMTA: ["Gobierno", "Calidad", "Arquitectura"],
    },
    {
      titulo: "Implementar Cliente 360",
      objetivo: "Bronze/Plata/Oro + reglas de unicidad",
      entregable: "Cliente 360 publicado y documentado",
      impactoIMTA: ["Arquitectura", "Calidad", "Metadatos"],
    },
    {
      titulo: "Completar Agricultor (en construcción)",
      objetivo: "Cruce y maestro agricultor 360",
      entregable: "Agricultor 360 publicado (con componente Proveedor ya implementado)",
      impactoIMTA: ["Arquitectura", "Gobierno"],
    },
    {
      titulo: "Publicación y Gobierno en AWS",
      objetivo: "Publicación en DataZone + catálogo + acceso",
      entregable: "Dominios publicados y gobernados",
      impactoIMTA: ["Metadatos", "Gobierno"],
    },
  ],
  imtaEsperado: "20–30% de incremento proyectado en dimensiones activadas (no en madurez global)",
  dominioEstado: [
    { nombre: "Agricultor", avanceTecnico: 30, nota: "En construcción (componente Proveedor ya implementado)" },
    { nombre: "Proveedor", avanceTecnico: 85, nota: "Maestro Proveedores en producción + productos Gold + proveedor_360" },
    { nombre: "Cliente", avanceTecnico: 0, nota: "A implementar en Quick Wins (8 semanas)" },
  ],
  imta: {
    baseline: 55,
    current: 68,
    targetQuickWins: 80,
    dimensions: [
      {
        key: "Gobierno",
        score: 16,
        max: 25,
        estado: "En transición",
        delta: "↑",
        evidencia: "Comités táctico/operativo habilitados + roles comunicados + política aplicada",
      },
      {
        key: "Metadatos",
        score: 15,
        max: 25,
        estado: "En transición",
        delta: "↑",
        evidencia: "Glue Data Catalog automatizado + DataZone configurado con publicación inicial",
      },
      {
        key: "Calidad",
        score: 14,
        max: 25,
        estado: "En transición",
        delta: "↑",
        evidencia: "Profiling y KPIs (completitud/unicidad/consistencia/duplicidad) en seguimiento",
      },
      {
        key: "Arquitectura",
        score: 23,
        max: 25,
        estado: "Consolidado",
        delta: "↑",
        evidencia: "Framework SAP→AWS + pipelines genéricos Bronze/Silver/Gold reutilizables",
      },
    ],
  },
  globalScore: {
    mode: "MODE_A", // MODE_A: numérico, MODE_B: estado cualitativo
    scale: "/5",
    baseline: 2.1,
    current: 2.4,
    estado: "En avance",
    dimensions: [
      { key: "Gobierno", baseline: 2.0, current: 2.3, estado: "En avance" },
      { key: "Metadatos", baseline: 2.1, current: 2.3, estado: "En avance" },
      { key: "Calidad", baseline: 2.0, current: 2.2, estado: "En avance" },
      { key: "Arquitectura", baseline: 2.3, current: 2.8, estado: "Consolidando" },
    ],
  },
  imtaCausalRows: [
    {
      id: "gobierno",
      evidenciaTitulo: "Comités + Roles/RACI",
      evidenciaEstado: "Activo",
      evidenciaTooltip: "Comités habilitados con cadencia definida y roles comunicados con RACI aplicado.",
      dimensionKey: "Gobierno",
      globalKey: "Gobierno",
    },
    {
      id: "metadatos",
      evidenciaTitulo: "Catálogo + DataZone",
      evidenciaEstado: "Operativo",
      evidenciaTooltip: "Catalogación automatizada en Glue y DataZone configurado con publicación inicial.",
      dimensionKey: "Metadatos",
      globalKey: "Metadatos",
    },
    {
      id: "calidad",
      evidenciaTitulo: "Profiling + KPIs",
      evidenciaEstado: "En seguimiento",
      evidenciaTooltip: "Métricas de completitud, unicidad, consistencia y duplicidad con tablero Power BI.",
      dimensionKey: "Calidad",
      globalKey: "Calidad",
    },
    {
      id: "arquitectura",
      evidenciaTitulo: "Framework SAP→AWS",
      evidenciaEstado: "Escalable",
      evidenciaTooltip: "Pipelines reutilizables Bronze/Silver/Gold para nuevos dominios sin rediseño estructural.",
      dimensionKey: "Arquitectura",
      globalKey: "Arquitectura",
    },
  ],
  mensajeFinal:
    "El proyecto cierra correctamente en lo administrativo y deja capacidad instalada operando. El IMTA se mueve por evidencia real de operación —no por intención— y el siguiente ciclo de 8 semanas busca acelerar dimensiones activadas con impacto directo en control, trazabilidad y velocidad de decisión.",
};

const SPEECH = {
  inicio:
    "Este proyecto no es un entregable aislado; es una transición estructural del manejo del dato en Grupo Diana. En siete meses se pasó de un estado de diagnóstico y diseño a un estado operativo con gobierno activo, arquitectura definida y ejecución técnica en marcha. El resultado principal es control: hoy existe una base real para decidir con mayor trazabilidad, menor reproceso y mayor velocidad de escalamiento.",
  fase1:
    "La Fase 1 estableció la línea base real de la compañía: capacidades, brechas y riesgos. No fue solo levantamiento documental; fue la construcción del mapa de decisión para priorizar dominios y ordenar inversiones. Se identificó una madurez intermedia con fortalezas técnicas y brechas claras en metadatos y calidad, lo que permitió enfocar el plan de transformación donde más valor genera.",
  fase2:
    "La Fase 2 dejó institucionalizado el marco de operación: gobierno declarativo, roles, comités, políticas, arquitectura objetivo y roadmap de transición. Este cierre asegura que la ejecución de Fase 3 no dependa de esfuerzos individuales, sino de un modelo formal, auditable y escalable. La compañía pasó de intención a estructura operativa.",
  fase3:
    "En Fase 3 el Gobierno del Dato entra en producción real. Ya existen activos técnicos y decisiones de comité que demuestran adopción operativa. El valor no está solo en construir pipelines: está en dejar capacidades reutilizables que reduzcan duplicidad, eleven calidad y conecten negocio y tecnología en una misma lógica de ejecución.",
  cambio:
    "Gestión del Cambio fue tratada como frente estratégico, no como apoyo accesorio. Se activaron comunicaciones, formación por roles, comités y seguimiento de mitigaciones para asegurar adopción sostenida. El avance en ADKAR y en la movilización de audiencias confirma que el modelo empieza a instalarse culturalmente, que es la condición para sostener resultados técnicos en el tiempo.",
  cierre:
    "La lectura ejecutiva del cierre es clara: la madurez crece cuando arquitectura, gobierno y cambio avanzan en paralelo. El objetivo no es eliminar completamente los gaps —siempre existirán— sino gestionarlos con disciplina y evidencia. El roadmap propuesto permite llevar la organización a un nivel de madurez superior con métricas concretas y foco en valor de negocio.",
  cierreFinal:
    "Este cierre consolida un ciclo completo: diagnóstico, diseño, implementación y alistamiento administrativo. Se entrega una base técnica reutilizable, un marco de gobierno activo y un plan de continuidad que protege la inversión realizada. La recomendación es mantener la cadencia de operación y acompañamiento para capturar el retorno esperado en adopción, calidad y velocidad de decisión.",
};

const CAMBIO_METRICS = {
  kci: "4 KCI principales (100% con planes de mitigación)",
  planes: "48 planes de mitigación identificados",
  avance: [
    { label: "Ejecutadas", value: 16 },
    { label: "En ejecución", value: 31 },
    { label: "Sin iniciar", value: 53 },
  ],
  dimensiones: ["Dominio", "Procesos", "Organización", "Tecnología"],
  adkar: [
    "Diagnóstico ADKAR y plan de acción de cambio",
    "Malla curricular v1 de Gobierno del Dato",
    "Matriz de stakeholders y plan de comunicaciones",
    "Webinars de expectativas de Gobierno de Datos",
  ],
};

const MADUREZ_GERENCIAS = [
  { name: "G. Administrativa", score: 2.3 },
  { name: "G. Estrategia y Transformación", score: 2.5 },
  { name: "G. UN Insumos", score: 2.2 },
  { name: "G. Comercial", score: 1.7 },
  { name: "G. UN Cereales", score: 2.5 },
  { name: "G. Mercadeo", score: 2.0 },
];

const BENCHMARK_SECTOR = [
  { name: "Promedio Empresas en Colombia", score: 2.3 },
  { name: "Agroindustria y Consumo Masivo LATAM", score: 2.1 },
  { name: "Grupo Diana – Madurez Global", score: 2.2 },
];

const MADUREZ_GLOBAL_DIMENSIONS = [
  { key: "gobierno", label: "Gobierno", score: 2.1 },
  { key: "calidad", label: "Calidad", score: 2.1 },
  { key: "metadatos", label: "Metadatos", score: 1.2 },
  { key: "seguridad", label: "Seguridad/Priv", score: 3.0 },
  { key: "arquitectura", label: "Arquitectura", score: 2.0 },
  { key: "integracion", label: "Integración", score: 2.1 },
];

const GOB_DECLARATIVO_DOMINIOS = [
  "Clientes (prioridad alta)",
  "Proveedores (prioridad alta)",
  "Agricultor (prioridad alta)",
  "Producción / Planta (prioridad media)",
  "Comercial / RTM (prioridad media)",
];

const DOMINIOS_PRIORIDAD_CHART = [
  { name: "Clientes", score: 85 },
  { name: "Proveedores", score: 82 },
  { name: "Agricultor", score: 88 },
  { name: "Producción/Planta", score: 65 },
  { name: "Comercial/RTM", score: 60 },
];

const GOB_DECLARATIVO_KPIS = [
  "Activos con clasificación vigente ≥ 80% (DataZone)",
  "Activos con Data Owner asignado ≥ 90%",
  "Data Contracts documentados ≥ 70% de activos productivos",
  "Dominios con comité activo y decisiones 100% publicadas",
  "Cumplimiento de reglas DQ declaradas ≥ 85%",
];

const ROADMAP_HORIZONS = [
  { label: "Preparación", window: "0–1 mes", focus: "Habilitación de la ejecución" },
  { label: "Quick Wins", window: "1–3 meses", focus: "Valor temprano y estabilización" },
  { label: "Corto–Mediano", window: "3–6 meses", focus: "Dominios fundacionales operativos" },
  { label: "Mediano", window: "6–12 meses", focus: "Transición activa consolidada" },
  { label: "Largo", window: "12–18 meses", focus: "Arquitectura TO‑BE estabilizada" },
];

const MADUREZ_TIMELINE = [
  { label: "Base actual", window: "Diagnóstico", target: "2.2 / 5", note: "Promedio sectorial" },
  { label: "Ciclo 1", window: "Quick Wins", target: "2.6–2.8 / 5", note: "Gobierno operativo + KPIs" },
  { label: "Ciclo 2", window: "3–6 meses", target: "3.0–3.4 / 5", note: "Dominios fundacionales estabilizados" },
  { label: "Ciclo 3", window: "6–12 meses", target: "3.5–4.0 / 5", note: "Transición consolidada" },
  { label: "Objetivo real", window: "12–18 meses", target: "4.5 / 5", note: "Siempre existirá un gap" },
];

const JOURNEY_TIMELINE = [
  { title: "Inicio del programa", date: "15 Sep 2025", detail: "Arranque del Gobierno del Dato en AWS", status: "base" },
  { title: "Fase 1 – Fundamentos", detail: "Priorización de dominios, mapa de procesos e iniciativas por ola", status: "done" },
  { title: "Fase 2 – Diseño cerrado", detail: "Modelo operativo, arquitectura To‑Be y roadmap definidos", status: "done" },
  { title: "Fase 3 – Operación real (hoy)", detail: "Gobierno operativo con comité activo y activos de datos en producción", status: "current" },
  { title: "Cierre planificado", date: "28 Feb 2026", detail: "Fin del proyecto (fecha planificada)", status: "future" },
];

const JOURNEY_PROGRESS = [
  { phase: "Fase 1", value: 100 },
  { phase: "Fase 2", value: 100 },
  { phase: "Fase 3", value: 98.9 },
];

// ==============================
// Minimal guards (no rompen UI)
// ==============================
function safeValidate() {
  const isPct = (n) => typeof n === "number" && n >= 0 && n <= 100;
  const ok =
    isPct(KPIS.proyectoTotal.esperado) &&
    isPct(KPIS.proyectoTotal.real) &&
    isPct(KPIS.proyectoTotal.spi) &&
    CDO_OFFICE.roles.length >= 5 &&
    CDO_OFFICE.comites.length === 3 &&
    FASE3_TESORERIA_SIEMBRA.length === 7;
  return ok;
}

// ==============================
// UI helpers (Style A)
// ==============================
function spiChipClass(spi) {
  if (spi >= 95) return "bg-emerald-500/10 border-emerald-500/25 text-emerald-800";
  if (spi >= 85) return "bg-sky-500/10 border-sky-500/25 text-sky-800";
  if (spi >= 70) return "bg-amber-500/10 border-amber-500/25 text-amber-800";
  return "bg-rose-500/10 border-rose-500/25 text-rose-800";
}

function prioPill(prio) {
  const base = "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border";
  if (prio === "Alta") return `${base} bg-rose-500/10 border-rose-500/25 text-rose-800`;
  if (prio === "Media") return `${base} bg-amber-500/10 border-amber-500/25 text-amber-800`;
  return `${base} bg-sky-500/10 border-sky-500/25 text-sky-800`;
}

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border bg-white shadow-sm ${className}`}>{children}</div>
);

const IconBadge = ({ icon: Icon, tone = "secondary" }) => (
  <div className="w-10 h-10 rounded-2xl bg-slate-100 border flex items-center justify-center">
    <Icon className="w-5 h-5" style={{ color: tone === "primary" ? brand.primary : brand.secondary }} />
  </div>
);

const SectionHeader = ({ n, title, subtitle, icon: Icon }) => (
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 rounded-2xl bg-white border shadow-sm flex items-center justify-center">
      <Icon className="w-5 h-5" style={{ color: brand.primary }} />
    </div>
    <div>
      <div className="flex items-center gap-2">
        <h2 className="text-lg md:text-xl font-semibold tracking-tight">
          {n}. {title}
        </h2>
      </div>
      {subtitle ? <p className="text-slate-500 text-sm mt-1">{subtitle}</p> : null}
    </div>
  </div>
);

const ProgressBar = ({ value, height = "h-2.5" }) => (
  <div className={`w-full ${height} rounded-full bg-slate-100 overflow-hidden`}>
    <div
      className="h-full rounded-full"
      style={{
        width: `${Math.max(0, Math.min(100, value))}%`,
        background: `linear-gradient(90deg, ${brand.secondary}, ${brand.primary})`,
      }}
    />
  </div>
);

const StatBox = ({ label, value, tone = "default" }) => (
  <div className="rounded-xl bg-slate-50 border p-3">
    <div className="text-[11px] text-slate-500">{label}</div>
    <div
      className="text-lg font-bold"
      style={{ color: tone === "primary" ? brand.primary : "#0f172a" }}
    >
      {value}
    </div>
  </div>
);

function fmtPct(n) {
  return `${Number(n).toFixed(1)}%`;
}

function fmtScore(n) {
  return `${Number(n).toFixed(1)} / 5`;
}

function parseCsv(raw) {
  const rows = [];
  let current = "";
  let row = [];
  let insideQuotes = false;

  for (let i = 0; i < raw.length; i += 1) {
    const char = raw[i];
    const next = raw[i + 1];

    if (char === '"') {
      if (insideQuotes && next === '"') {
        current += '"';
        i += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === "," && !insideQuotes) {
      row.push(current);
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(current);
      current = "";
      if (row.some((cell) => cell !== "")) rows.push(row);
      row = [];
      continue;
    }

    current += char;
  }

  if (current.length || row.length) {
    row.push(current);
    if (row.some((cell) => cell !== "")) rows.push(row);
  }

  if (!rows.length) return [];

  const [headers, ...body] = rows;
  return body.map((cells) =>
    headers.reduce((acc, header, index) => {
      acc[header] = cells[index] ?? "";
      return acc;
    }, {})
  );
}

function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function qualityTone(value, reverse = false) {
  const score = Number(value);
  if (reverse) {
    if (score >= 90) return "text-rose-700";
    if (score >= 40) return "text-amber-700";
    return "text-emerald-700";
  }
  if (score >= 85) return "text-emerald-700";
  if (score >= 50) return "text-amber-700";
  return "text-rose-700";
}

const StackedQualityBar = ({ complete, partial, critical }) => (
  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
    <div className="flex h-full w-full">
      <div className="h-full bg-emerald-500" style={{ width: `${complete}%` }} />
      <div className="h-full bg-amber-400" style={{ width: `${partial}%` }} />
      <div className="h-full bg-rose-500" style={{ width: `${critical}%` }} />
    </div>
  </div>
);

const QualityMiniBar = ({ value, color = "#004B8D" }) => (
  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
    <div className="h-full rounded-full" style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }} />
  </div>
);

const RadarChart = ({ data, size = 240 }) => {
  const center = size / 2;
  const radius = size * 0.38;
  const levels = 5;
  const angleStep = (Math.PI * 2) / data.length;

  const points = data.map((d, i) => {
    const value = Math.max(0, Math.min(5, d.score));
    const r = (value / 5) * radius;
    const angle = -Math.PI / 2 + i * angleStep;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return [x, y];
  });

  const polygon = points.map((p) => p.join(",")).join(" ");

  const gridPolygons = Array.from({ length: levels }, (_, i) => {
    const r = ((i + 1) / levels) * radius;
    const pts = data
      .map((_, idx) => {
        const angle = -Math.PI / 2 + idx * angleStep;
        const x = center + r * Math.cos(angle);
        const y = center + r * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
    return pts;
  });

  const axisLines = data.map((_, i) => {
    const angle = -Math.PI / 2 + i * angleStep;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {gridPolygons.map((pts, i) => (
        <polygon key={`grid-${i}`} points={pts} fill="none" stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {axisLines.map((p, i) => (
        <line key={`axis-${i}`} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#e2e8f0" strokeWidth="1" />
      ))}
      <polygon points={polygon} fill="rgba(225,38,28,0.18)" stroke={brand.primary} strokeWidth="2" />
    </svg>
  );
};

const JourneyLineChart = ({ data }) => {
  const width = 560;
  const height = 220;
  const pad = 32;
  const step = (width - pad * 2) / (data.length - 1 || 1);

  const points = data.map((d, i) => {
    const x = pad + i * step;
    const y = pad + ((100 - d.value) / 100) * (height - pad * 2);
    return { ...d, x, y };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
      <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#cbd5e1" strokeWidth="1" />
      <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#cbd5e1" strokeWidth="1" />
      <polyline fill="none" stroke={brand.primary} strokeWidth="3" points={polyline} />
      {points.map((p) => (
        <g key={p.phase}>
          <circle cx={p.x} cy={p.y} r="5" fill={brand.secondary} />
          <text x={p.x} y={height - 10} textAnchor="middle" fontSize="11" fill="#475569">
            {p.phase}
          </text>
          <text x={p.x} y={p.y - 10} textAnchor="middle" fontSize="11" fill="#0f172a">
            {p.value}%
          </text>
        </g>
      ))}
    </svg>
  );
};

function KPIBlock({ title, icon: Icon, esperado, real, spi }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <IconBadge icon={Icon} />
          <div>
            <div className="text-[11px] uppercase tracking-wide text-slate-500">Indicador</div>
            <div className="text-sm font-semibold text-slate-900 leading-tight">{title}</div>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${spiChipClass(spi)}`}>SPI {spi}%</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <StatBox label="Avance esperado" value={fmtPct(esperado)} />
          <div className="mt-2">
            <ProgressBar value={esperado} />
          </div>
        </div>
        <div>
          <StatBox label="Avance real" value={fmtPct(real)} tone="primary" />
          <div className="mt-2">
            <ProgressBar value={real} />
          </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 mt-3">
        Lectura rápida: el SPI mide cumplimiento del cronograma; no evalúa calidad del entregable.
      </p>
    </Card>
  );
}

function BulletList({ items, tone = "slate" }) {
  const dot =
    tone === "primary"
      ? "bg-rose-600"
      : tone === "secondary"
      ? "bg-sky-700"
      : "bg-slate-400";
  return (
    <ul className="mt-2 space-y-2 text-sm text-slate-700">
      {items.map((x) => (
        <li key={x} className="flex gap-2">
          <span className={`mt-2 w-1.5 h-1.5 rounded-full ${dot}`} />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

function OrgMini() {
  // Organigrama compacto (visual hit)
  return (
    <div className="rounded-2xl border bg-slate-50 p-4">
      <div className="text-[12px] font-semibold" style={{ color: brand.secondary }}>
        Organigrama (visión rápida)
      </div>
      <div className="mt-3">
        <div className="rounded-xl border bg-white px-3 py-2 text-sm font-semibold text-slate-900">
          CDO Office
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-xl border bg-white px-3 py-2 text-[12px]">Gobierno (DGD)</div>
          <div className="rounded-xl border bg-white px-3 py-2 text-[12px]">Analítica (CDAO)</div>
          <div className="rounded-xl border bg-white px-3 py-2 text-[12px]">Arquitectura</div>
          <div className="rounded-xl border bg-white px-3 py-2 text-[12px]">Calidad</div>
          <div className="rounded-xl border bg-white px-3 py-2 text-[12px]">Metadatos/Catálogo</div>
          <div className="rounded-xl border bg-white px-3 py-2 text-[12px]">Seguridad/Privacidad</div>
          <div className="rounded-xl border bg-white px-3 py-2 text-[12px]">Custodia (TI)</div>
          <div className="rounded-xl border bg-white px-3 py-2 text-[12px]">Cambio</div>
        </div>
        <div className="mt-3 text-[11px] text-slate-500">
          Nota: los comités (Directivo/Táctico/Operativo) habilitan decisión, reglas y ejecución.
        </div>
      </div>
    </div>
  );
}

// ==============================
// Component
// ==============================
export default function App() {
  const [mode, setMode] = useState("inicio"); // inicio | fase1 | fase2 | fase3 | calidad | cambio | cierre | cierreFinal
  const [qualitySelection, setQualitySelection] = useState("");

  const status = useMemo(() => {
    // Estado general de cierre
    return {
      title: "Proyecto en cierre final",
      spiLabel: "SPI Proyecto Total",
      spi: KPIS.proyectoTotal.spi,
      priority:
        "Prioridad inmediata: completar actividades administrativas de cierre y asegurar continuidad operativa del Gobierno del Dato.",
    };
  }, []);

  const dataOK = useMemo(() => safeValidate(), []);

  const highlights = {
    fase1: [
      "Priorización de dominios por gerencia con criterios de madurez, riesgo, dependencia TI y transversalidad",
      "Mapa de procesos por dominio y vínculo con iniciativas (incluye Formación Casanare)",
      "Definición de olas de implementación y dominios base",
      "Diagnóstico AS‑IS del ecosistema de datos y evaluación de madurez DAMA",
      "Entregable visual: árbol de dominios y dependencias",
    ],
    fase2: [
      "Modelo operativo y comités definidos (Directivo, Táctico, Operativo)",
      "Arquitectura To‑Be y transición cerradas para ejecución",
      "Procedimientos base y roadmap definidos",
      "Gobierno declarativo formalizado (dominios, políticas, RACI y KPIs)",
    ],
    fase3: [
      "Gobierno operativo en marcha con comité activo y decisiones sobre dominios y prioridades",
      "Producto de datos Maestro Agricultor como activo reutilizable",
      "GLUE JOB genérico + ingesta Bronze en AWS para maestros",
      "Perfilamiento de tablas y KPI’s de calidad",
      "Catalogación Bronze Agricultor (Crawlers y Glue Data Catalog)",
    ],
  };

  const imtaTotalScore = CIERRE_FINAL.imta.dimensions.reduce((acc, d) => acc + d.score, 0);
  const imtaTotalMax = CIERRE_FINAL.imta.dimensions.reduce((acc, d) => acc + d.max, 0);
  const imtaComputed = Math.round((imtaTotalScore / imtaTotalMax) * 100);
  const imtaDelta = CIERRE_FINAL.imta.current - CIERRE_FINAL.imta.baseline;
  const dominioAgricultor = CIERRE_FINAL.dominioEstado.find((d) => d.nombre === "Agricultor");
  const globalScoreDelta = Number((CIERRE_FINAL.globalScore.current - CIERRE_FINAL.globalScore.baseline).toFixed(1));
  const imtaByKey = Object.fromEntries(CIERRE_FINAL.imta.dimensions.map((d) => [d.key, d]));
  const globalByKey = Object.fromEntries(CIERRE_FINAL.globalScore.dimensions.map((d) => [d.key, d]));
  const qualityColumns = useMemo(() => parseCsv(dqColumnsRaw), []);
  const qualityDataset = useMemo(() => parseCsv(dqDatasetRaw), []);
  const qualityMetadata = useMemo(() => parseCsv(dqMetadataRaw), []);

  const qualityDashboard = useMemo(() => {
    const columnsByKey = qualityColumns.reduce((acc, row) => {
      const key = `${row.dataset_name}__${row.execution_date}`;
      acc[key] ??= [];
      acc[key].push(row);
      return acc;
    }, {});

    const metadataByTable = qualityMetadata.reduce((acc, row) => {
      const datasetName = row.table_name.split(".").pop();
      acc[datasetName] = row;
      return acc;
    }, {});

    const summary = qualityDataset
      .map((row) => {
        const key = `${row.dataset_name}__${row.execution_date}`;
        const relatedColumns = columnsByKey[key] || [];
        const zones = Array.from(new Set(relatedColumns.map((item) => item.zone))).filter(Boolean);
        const criticalColumns = relatedColumns.filter((item) => item.is_critical === "true");
        const columnsOver90 = relatedColumns.filter((item) => toNumber(item.missing_pct) >= 90);
        const metadataRow = metadataByTable[row.dataset_name] || null;
        const averageMissing =
          relatedColumns.length > 0
            ? relatedColumns.reduce((acc, item) => acc + toNumber(item.missing_pct), 0) / relatedColumns.length
            : 0;

        return {
          datasetName: row.dataset_name,
          executionDate: row.execution_date,
          zone: zones[0] || "N/D",
          zones,
          complete: toNumber(row.pct_rows_complete),
          partial: toNumber(row.pct_rows_partial),
          critical: toNumber(row.pct_rows_critical),
          criticalColumnsCount: toNumber(row.critical_columns_count),
          criticalColumnsLabel: row.critical_columns,
          columnsCount: relatedColumns.length,
          criticalColumns,
          columnsOver90,
          averageMissing,
          metadataCoverage: metadataRow ? toNumber(metadataRow.metadata_pct_coverage) : null,
          metadataWithComment: metadataRow ? toNumber(metadataRow.metadata_columns_with_comment) : 0,
          metadataWithoutComment: metadataRow ? toNumber(metadataRow.metadata_columns_without_comment) : 0,
        };
      })
      .sort((a, b) => {
        if (b.critical !== a.critical) return b.critical - a.critical;
        return b.partial - a.partial;
      });

    const latestDate = summary.reduce(
      (maxDate, row) => (row.executionDate > maxDate ? row.executionDate : maxDate),
      "0000-00-00"
    );

    const totals = summary.reduce(
      (acc, row) => {
        acc.datasets += 1;
        acc.complete += row.complete;
        acc.partial += row.partial;
        acc.critical += row.critical;
        acc.columns += row.columnsCount;
        acc.criticalColumns += row.criticalColumnsCount;
        acc.highRiskColumns += row.columnsOver90.length;
        if (row.metadataCoverage !== null) {
          acc.metadataCount += 1;
          acc.metadataCoverage += row.metadataCoverage;
        }
        acc.zones[row.zone] = (acc.zones[row.zone] || 0) + 1;
        return acc;
      },
      {
        datasets: 0,
        complete: 0,
        partial: 0,
        critical: 0,
        columns: 0,
        criticalColumns: 0,
        highRiskColumns: 0,
        metadataCount: 0,
        metadataCoverage: 0,
        zones: {},
      }
    );

    const zoneSummary = Object.entries(totals.zones)
      .map(([zone, count]) => ({
        zone,
        count,
        averageCritical:
          summary.filter((row) => row.zone === zone).reduce((acc, row) => acc + row.critical, 0) / count,
        averageComplete:
          summary.filter((row) => row.zone === zone).reduce((acc, row) => acc + row.complete, 0) / count,
      }))
      .sort((a, b) => a.zone.localeCompare(b.zone));

    const topCriticalColumns = qualityColumns
      .filter((row) => row.is_critical === "true")
      .sort((a, b) => {
        if (toNumber(b.missing_pct) !== toNumber(a.missing_pct)) {
          return toNumber(b.missing_pct) - toNumber(a.missing_pct);
        }
        return toNumber(b.missing_count) - toNumber(a.missing_count);
      })
      .slice(0, 8)
      .map((row) => ({
        datasetName: row.dataset_name,
        columnName: row.column_name,
        missingPct: toNumber(row.missing_pct),
        missingCount: toNumber(row.missing_count),
        executionDate: row.execution_date,
      }));

    return {
      summary,
      latestDate,
      totals: {
        averageComplete: totals.datasets ? totals.complete / totals.datasets : 0,
        averagePartial: totals.datasets ? totals.partial / totals.datasets : 0,
        averageCritical: totals.datasets ? totals.critical / totals.datasets : 0,
        columns: totals.columns,
        criticalColumns: totals.criticalColumns,
        highRiskColumns: totals.highRiskColumns,
        metadataCoverage: totals.metadataCount ? totals.metadataCoverage / totals.metadataCount : 0,
      },
      topCriticalColumns,
      zoneSummary,
    };
  }, [qualityColumns, qualityDataset, qualityMetadata]);

  const activeQualityDataset =
    qualityDashboard.summary.find((item) => item.datasetName === qualitySelection)?.datasetName ||
    qualityDashboard.summary[0]?.datasetName ||
    "";

  const activeQualityDetail =
    qualityDashboard.summary.find((item) => item.datasetName === activeQualityDataset) || null;

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: `linear-gradient(180deg, ${brand.bgTop} 0%, ${brand.bgBottom} 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: brand.primary }}>
              Fase 3 – Gobierno del Dato (Gerencia General)
            </h1>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Infografía ejecutiva para Gerencia General: estado del proyecto, foco de Gestión del Cambio,
              Gobierno operativo y declarativo (modelo operativo y comités), arquitectura To‑Be (incluida transición)
              y avance de Fase 3 (Formación Casanare).
            </p>
            <div className="mt-3 rounded-xl border bg-slate-50 p-3 text-[12px] text-slate-700">
              <strong>Valor para Gerencia General:</strong> control, visibilidad, trazabilidad y capacidad de decisión sobre
              dominios, arquitectura y prioridades; no solo entregables técnicos.
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                className={`rounded-xl border shadow-sm px-3 py-2 text-sm transition ${
                  mode === "inicio" ? "bg-slate-900 text-white border-slate-900" : "bg-white opacity-80"
                }`}
                onClick={() => setMode("inicio")}
              >
                Inicio (Journey)
              </button>
              <button
                className={`rounded-xl border shadow-sm px-3 py-2 text-sm transition ${
                  mode === "fase1" ? "bg-slate-900 text-white border-slate-900" : "bg-white opacity-80"
                }`}
                onClick={() => setMode("fase1")}
              >
                Fase 1
              </button>
              <button
                className={`rounded-xl border shadow-sm px-3 py-2 text-sm transition ${
                  mode === "fase2" ? "bg-slate-900 text-white border-slate-900" : "bg-white opacity-80"
                }`}
                onClick={() => setMode("fase2")}
              >
                Fase 2
              </button>
              <button
                className={`rounded-xl border shadow-sm px-3 py-2 text-sm transition ${
                  mode === "fase3" ? "bg-slate-900 text-white border-slate-900" : "bg-white opacity-80"
                }`}
                onClick={() => setMode("fase3")}
              >
                Fase 3 (detalle)
              </button>
              <button
                className={`rounded-xl border shadow-sm px-3 py-2 text-sm transition ${
                  mode === "calidad" ? "bg-slate-900 text-white border-slate-900" : "bg-white opacity-80"
                }`}
                onClick={() => setMode("calidad")}
              >
                Calidad al momento
              </button>
              <button
                className={`rounded-xl border shadow-sm px-3 py-2 text-sm transition ${
                  mode === "cambio" ? "bg-slate-900 text-white border-slate-900" : "bg-white opacity-80"
                }`}
                onClick={() => setMode("cambio")}
              >
                Gestión del Cambio (ADKAR)
              </button>
              <button
                className={`rounded-xl border shadow-sm px-3 py-2 text-sm transition ${
                  mode === "cierre" ? "bg-slate-900 text-white border-slate-900" : "bg-white opacity-80"
                }`}
                onClick={() => setMode("cierre")}
              >
                Próximos pasos y postventa
              </button>
              <button
                className={`rounded-xl border shadow-sm px-3 py-2 text-sm transition ${
                  mode === "cierreFinal" ? "bg-slate-900 text-white border-slate-900" : "bg-white opacity-80"
                }`}
                onClick={() => setMode("cierreFinal")}
              >
                Cierre final
              </button>
            </div>

            {!dataOK ? (
              <div className="mt-3 rounded-xl border bg-amber-50 p-3 text-[12px] text-amber-900">
                <strong>Advertencia:</strong> hay datos incompletos en el mock. La UI renderiza, pero valida la fuente.
              </div>
            ) : null}
          </div>

          {/* STATUS CARD */}
          <Card className="p-4 lg:w-[420px]">
            <div className="text-[11px] uppercase tracking-wider text-slate-500">Estado</div>
            <div className="text-base font-semibold text-slate-900 mt-1">{status.title}</div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[12px] text-slate-600">
                <span>{status.spiLabel}</span>
                <span className="font-semibold" style={{ color: brand.primary }}>
                  {status.spi}%
                </span>
              </div>
              <div className="mt-2">
                <ProgressBar value={status.spi} />
              </div>
            </div>

            <div className="mt-4 text-[12px] text-slate-600">
              {status.priority}
            </div>
            <div className="mt-3 text-[11px] text-slate-500">
              Nota: el proyecto está planeado para finalizar el 28 de febrero de 2026.
            </div>
          </Card>
        </div>

        {/* BODY */}
        {mode === "inicio" ? (
          <div className="mt-6 space-y-6">
            <Card className="p-5">
              <div className="text-xs uppercase tracking-wide text-slate-500">Speech sugerido</div>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">{SPEECH.inicio}</p>
            </Card>
            <Card className="p-5">
              <SectionHeader
                n={0}
                title="Resumen de avance acumulado"
                subtitle="Ejecución del proyecto de punta a punta"
                icon={CheckCircle2}
              />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatBox label="Proyecto total" value={fmtPct(KPIS.proyectoTotal.real)} tone="primary" />
                <StatBox label="Esperado final" value={fmtPct(KPIS.proyectoTotal.esperado)} />
                <StatBox label="Gap final" value={fmtPct(CIERRE_FINAL.gap)} />
                <StatBox label="Fases cerradas" value="F1 y F2 completas" />
              </div>
              <div className="mt-4 rounded-2xl border bg-slate-50 p-4">
                <p className="text-sm text-slate-700">
                  <strong>Conclusión del journey:</strong> el proyecto cierra el ciclo completo de diagnóstico, diseño,
                  implementación y adopción. Se deja un modelo operativo activo, capacidades técnicas reutilizables y
                  una ruta de continuidad para escalar el Gobierno del Dato.
                </p>
              </div>
            </Card>
            <Card className="p-5">
              <SectionHeader
                n={0}
                title="Journey del proyecto (inicio → hoy)"
                subtitle="Transición completa: diseño → gobierno operativo y medible"
                icon={TrendingUp}
              />

              <div className="mt-5 rounded-2xl border bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">Gráfico de avance por fase</div>
                <div className="mt-3">
                  <JourneyLineChart data={JOURNEY_PROGRESS} />
                </div>
              </div>

              <div className="mt-5">
                <div className="flex flex-col gap-4 border-l-2 border-slate-200 pl-4">
                  {JOURNEY_TIMELINE.map((item, idx) => (
                    <div key={`${item.title}-${idx}`} className="relative pl-4">
                      <span
                        className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full border border-white"
                        style={{
                          background:
                            item.status === "done"
                              ? "#16a34a"
                              : item.status === "current"
                              ? "#f59e0b"
                              : "#94a3b8",
                        }}
                      />
                      <div className="rounded-xl border bg-white p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                          {item.date ? (
                            <div className="text-[11px] px-2 py-0.5 rounded-full border bg-slate-50 text-slate-600">
                              {item.date}
                            </div>
                          ) : null}
                        </div>
                        <div className="text-[12px] text-slate-600 mt-1">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900 inline-flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Fase 1 – Fundamentos
                  </div>
                  <BulletList items={highlights.fase1} />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900 inline-flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Fase 2 – Diseño cerrado
                  </div>
                  <BulletList items={highlights.fase2} />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900 inline-flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Fase 3 – Operación real
                  </div>
                  <BulletList items={highlights.fase3} />
                </div>
              </div>
            </Card>
          </div>
        ) : mode === "fase1" ? (
          <div className="mt-6 space-y-6">
            <Card className="p-5">
              <div className="text-xs uppercase tracking-wide text-slate-500">Speech sugerido</div>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">{SPEECH.fase1}</p>
            </Card>
            <Card className="p-5">
              <SectionHeader
                n={1}
                title="Fase 1 – Highlights"
                subtitle="Priorización de dominios y definición de iniciativas"
                icon={Layers}
              />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Priorización de dominios</div>
                  <BulletList items={highlights.fase1} />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Entregables clave</div>
                  <BulletList
                    items={[
                      "Árbol de dominios con dependencias por gerencia",
                      "Mapa de procesos por dominio",
                      "Iniciativas por ola (incluye Formación Casanare)",
                      "Diagnóstico AS‑IS con cobertura organizacional completa",
                      "Evaluación de madurez DAMA por área y dominios",
                    ]}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={2}
                title="Detalle Fase 1 – Entregables de gobierno"
                subtitle="Estado de partida (AS‑IS) + madurez y priorización"
                icon={BookOpen}
              />
              <div className="mt-4 rounded-2xl border bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">Estado de partida (AS‑IS) — lectura ejecutiva</div>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>Ecosistema de datos heterogéneo, con múltiples sistemas por unidad de negocio.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>Alta dependencia operativa de TI y reportería manual en áreas clave.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>Madurez organizacional intermedia (≈ 2–3 DAMA); TI/BI con madurez alta (≈ 4–5).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>Brechas en trazabilidad, metadatos y unificación de datos maestros.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Priorización de dominios</div>
                  <BulletList
                    items={[
                      "Criterios: madurez, riesgo, dependencia TI y transversalidad",
                      "Gerencias mapeadas con dominios base",
                      "Iniciativas asociadas por ola de implementación",
                    ]}
                  />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Panel ejecutivo de gobierno</div>
                  <BulletList
                    items={[
                      "Madurez por gerencia y dimensión (Gobierno, Calidad, Metadatos, Seguridad, Arquitectura, Integración)",
                      "Brechas vs. objetivo de madurez",
                      "Indicadores ejecutivos por gerencia",
                    ]}
                  />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Diagnóstico AS‑IS y madurez</div>
                  <BulletList
                    items={[
                      "Levantamiento AS‑IS con entrevistas, revisión documental y análisis técnico",
                      "Cobertura organizacional completa y mapa de aplicaciones/integraciones",
                      "Madurez DAMA intermedia (≈ 2–3) y brechas de gestión del dato en negocio",
                      "Gobierno del Dato incipiente: base para el modelo declarativo y operativo",
                    ]}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={3}
                title="Madurez por Gerencia y benchmark sectorial"
                subtitle="Lectura para Gerencia General: cómo está la compañía vs. el sector"
                icon={Target}
              />
              <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4 lg:col-span-2">
                  <div className="text-sm font-semibold text-slate-900">Gobierno por Gerencias (escala 1–5)</div>
                  <div className="mt-3 space-y-3">
                    {MADUREZ_GERENCIAS.map((g) => (
                      <div key={g.name} className="rounded-xl border bg-white p-3">
                        <div className="flex items-center justify-between text-[12px] text-slate-700">
                          <span className="font-semibold">{g.name}</span>
                          <span className="text-slate-600">{fmtScore(g.score)}</span>
                        </div>
                        <div className="mt-2">
                          <ProgressBar value={(g.score / 5) * 100} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Comparativo sectorial</div>
                  <div className="mt-3 space-y-3">
                    {BENCHMARK_SECTOR.map((b) => (
                      <div key={b.name} className="rounded-xl border bg-white p-3">
                        <div className="text-[12px] text-slate-700 font-semibold">{b.name}</div>
                        <div className="mt-1 text-[12px] text-slate-600">{fmtScore(b.score)}</div>
                        <div className="mt-2">
                          <ProgressBar value={(b.score / 5) * 100} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">Lectura ejecutiva</div>
                <ul className="mt-2 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>Grupo Diana está en la franja media del país y del sector, con ventaja tecnológica en AWS.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>La brecha principal es metadatos y calidad del dato, más que tecnología.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>El modelo operativo y el datalake nacen juntos: oportunidad para subir a madurez 3+ más rápido.</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={4}
                title="Detalle de la calificación global (Madurez DAMA)"
                subtitle="Qué está bien y qué requiere foco inmediato"
                icon={Info}
              />
              <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4 lg:col-span-2">
                  <div className="text-sm font-semibold text-slate-900">Tabla de dimensiones (escala 1–5)</div>
                  <div className="mt-3 overflow-hidden rounded-xl border bg-white">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-slate-600">
                        <tr>
                          <th className="text-left font-semibold px-3 py-2">Dimensión</th>
                          <th className="text-left font-semibold px-3 py-2">Calificación</th>
                          <th className="text-left font-semibold px-3 py-2">Lectura</th>
                        </tr>
                      </thead>
                      <tbody>
                        {MADUREZ_GLOBAL_DIMENSIONS.map((d) => (
                          <tr key={d.key} className="border-t">
                            <td className="px-3 py-2 text-slate-800">{d.label}</td>
                            <td className="px-3 py-2 text-slate-700">{fmtScore(d.score)}</td>
                            <td className="px-3 py-2 text-slate-600">
                              {d.score >= 3 ? "Fortaleza" : d.score >= 2 ? "Intermedio" : "Brecha"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4 flex flex-col items-center justify-center">
                  <div className="text-sm font-semibold text-slate-900">Radar de madurez</div>
                  <div className="mt-3">
                    <RadarChart data={MADUREZ_GLOBAL_DIMENSIONS} size={240} />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-2">
                    Escala 1–5; foco en metadatos y calidad.
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : mode === "fase2" ? (
          <div className="mt-6 space-y-6">
            <Card className="p-5">
              <div className="text-xs uppercase tracking-wide text-slate-500">Speech sugerido</div>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">{SPEECH.fase2}</p>
            </Card>
            <Card className="p-5">
              <SectionHeader
                n={2}
                title="Fase 2 – Highlights"
                subtitle="Diseño completo listo para operación"
                icon={ClipboardCheck}
              />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Logros principales</div>
                  <BulletList items={highlights.fase2} />
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-sm text-slate-700 leading-relaxed">
                    <strong>Mensaje clave:</strong> {CIERRE_FASE2.mensajeClave}
                  </div>
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <SectionHeader
                n={3}
                title="Detalle Fase 2 – Entregables cerrados"
                subtitle="Gobierno declarativo y arquitectura listos para operar"
                icon={Layers}
              />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Arquitectura To‑Be</div>
                  <BulletList items={CIERRE_FASE2.arquitectura} />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Modelo Operativo</div>
                  <BulletList items={CIERRE_FASE2.modeloOperativo} />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Procedimientos y Roadmap</div>
                  <BulletList items={CIERRE_FASE2.procedimientosRoadmap} />
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <SectionHeader
                n={4}
                title="Gobierno Declarativo (Fase 2)"
                subtitle="Bases normativas, organizacionales y KPIs del Gobierno del Dato"
                icon={ShieldCheck}
              />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Dominios priorizados</div>
                  <BulletList items={GOB_DECLARATIVO_DOMINIOS} />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Prioridad de dominios (visual)</div>
                  <div className="mt-3 space-y-3">
                    {DOMINIOS_PRIORIDAD_CHART.map((d) => (
                      <div key={d.name} className="rounded-xl border bg-white p-3">
                        <div className="flex items-center justify-between text-[12px] text-slate-700">
                          <span className="font-semibold">{d.name}</span>
                          <span className="text-slate-600">{d.score}%</span>
                        </div>
                        <div className="mt-2">
                          <ProgressBar value={d.score} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Modelo operativo federado</div>
                  <BulletList
                    items={[
                      "Roles: Data Owner, Steward, Custodian, Data Product Owner, Arquitecto de Datos",
                      "Mecanismos: Comité mensual + círculos de dominio quincenales",
                      "Flujo de decisiones: Propuesta → Validación → Aprobación (Comité)",
                    ]}
                  />
                </div>
              </div>
              <div className="mt-4 rounded-2xl border bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">KPIs base del gobierno</div>
                <BulletList items={GOB_DECLARATIVO_KPIS} />
              </div>
              <div className="mt-4 rounded-2xl border bg-white p-4">
                <div className="text-sm text-slate-700 leading-relaxed">
                  <strong>Políticas y estándares iniciales:</strong> clasificación y manejo del dato, data contracts,
                  nomenclatura/versionado y control de cambios, con artefactos base (RACI, minuta de comité,
                  diccionario de datos y workflow de aprobación).
                </div>
              </div>
            </Card>
            <Card className="p-5">
              <SectionHeader
                n={5}
                title="Arquitectura To‑Be y Roadmap Oficial"
                subtitle="Transición controlada hacia la arquitectura objetivo en AWS"
                icon={GitBranch}
              />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Arquitectura To‑Be (AWS)</div>
                  <BulletList
                    items={[
                      "S3 Bronze/Silver/Gold con Glue ETL, Crawlers y Data Quality",
                      "Gobierno y seguridad: Lake Formation, Data Catalog, IAM, CloudTrail/CloudWatch",
                      "Consumo estándar: Power BI con workspaces por gerencia",
                    ]}
                  />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Arquitectura de transición</div>
                  <BulletList
                    items={[
                      "Puente controlado entre AS‑IS y TO‑BE",
                      "Duración estimada 12–18 meses",
                      "Indicador de seguimiento: IMTA (madurez de transición)",
                    ]}
                  />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Horizontes del roadmap</div>
                  <ul className="mt-2 space-y-2 text-sm text-slate-700">
                    {ROADMAP_HORIZONS.map((h) => (
                      <li key={h.label} className="flex gap-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>
                          <strong>{h.label}</strong> ({h.window}): {h.focus}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        ) : mode === "calidad" ? (
          <div className="mt-6 space-y-6">
            <Card className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="max-w-3xl">
                  <div className="text-xs uppercase tracking-wide text-slate-500">Power BI style</div>
                  <h2 className="text-lg md:text-xl font-semibold tracking-tight mt-1">
                    Calidad al momento
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Vista ejecutiva de salud de datos con la <strong>zona</strong> como eje de lectura. `dq_dataset`
                    resume la calidad de las <strong>llaves y columnas críticas</strong> por tabla; `dq_columns`
                    permite bajar al detalle por columna; `dq_metadata` muestra cobertura documental de productos de
                    datos <strong>gold</strong>. Esta vista sustituye temporalmente el dashboard de Power BI mientras se
                    cierra esa entrega. Corte combinado hasta <strong>{qualityDashboard.latestDate}</strong>.
                  </p>
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4 lg:w-[320px]">
                  <div className="text-[11px] uppercase tracking-wide text-slate-500">Lectura rápida</div>
                  <div className="mt-2 text-sm text-slate-700 leading-relaxed">
                    En este corte hay datasets en <strong>bronze</strong> y <strong>gold</strong>; no aparece capa
                    <strong> silver/plata</strong>. Los focos inmediatos están en{" "}
                    <strong>proveedor_por_direcciones</strong> y <strong>proveedor_por_datos_bancarios</strong>.
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
                <StatBox label="Datasets monitoreados" value={`${qualityDashboard.summary.length}`} tone="primary" />
                <StatBox label="Promedio filas completas" value={fmtPct(qualityDashboard.totals.averageComplete)} />
                <StatBox label="Promedio filas críticas" value={fmtPct(qualityDashboard.totals.averageCritical)} />
                <StatBox label="Columnas críticas" value={`${qualityDashboard.totals.criticalColumns}`} />
                <StatBox label="Metadatos en gold" value={fmtPct(qualityDashboard.totals.metadataCoverage)} />
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {qualityDashboard.zoneSummary.map((item) => (
                  <div key={item.zone} className="rounded-2xl border bg-white p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[11px] uppercase tracking-wide text-slate-500">Zona</div>
                        <div className="text-base font-semibold text-slate-900">{item.zone}</div>
                      </div>
                      <span className="rounded-full border bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-700">
                        {item.count} datasets
                      </span>
                    </div>
                    <div className="mt-4 space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-[12px] text-slate-600">
                          <span>Promedio completo</span>
                          <span className="font-semibold text-emerald-700">{fmtPct(item.averageComplete)}</span>
                        </div>
                        <div className="mt-1">
                          <QualityMiniBar value={item.averageComplete} color="#16a34a" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-[12px] text-slate-600">
                          <span>Promedio crítico</span>
                          <span className={`font-semibold ${qualityTone(item.averageCritical, true)}`}>
                            {fmtPct(item.averageCritical)}
                          </span>
                        </div>
                        <div className="mt-1">
                          <QualityMiniBar value={item.averageCritical} color="#e11d48" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={1}
                title="Resumen por dataset"
                subtitle="Distribución de filas completas, parciales y críticas"
                icon={TrendingUp}
              />
              <div className="mt-5 overflow-x-auto">
                <div className="min-w-[920px] space-y-3">
                  {qualityDashboard.summary.map((item) => {
                    const isActive = item.datasetName === activeQualityDataset;
                    return (
                      <button
                        key={`${item.datasetName}-${item.executionDate}`}
                        type="button"
                        onClick={() => setQualitySelection(item.datasetName)}
                        className={`grid w-full grid-cols-12 items-center gap-3 rounded-2xl border p-4 text-left transition ${
                          isActive ? "border-slate-900 bg-slate-900 text-white shadow-sm" : "bg-white hover:bg-slate-50"
                        }`}
                      >
                        <div className="col-span-3">
                          <div className="text-sm font-semibold">{item.datasetName}</div>
                          <div className={`text-[11px] ${isActive ? "text-white/70" : "text-slate-500"}`}>
                            Zona {item.zone} · corte {item.executionDate}
                          </div>
                        </div>
                        <div className="col-span-4">
                          <StackedQualityBar
                            complete={item.complete}
                            partial={item.partial}
                            critical={item.critical}
                          />
                          <div className={`mt-2 flex items-center gap-3 text-[11px] ${isActive ? "text-white/80" : "text-slate-500"}`}>
                            <span>Completo {fmtPct(item.complete)}</span>
                            <span>Parcial {fmtPct(item.partial)}</span>
                            <span>Crítico {fmtPct(item.critical)}</span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className={`text-[11px] ${isActive ? "text-white/70" : "text-slate-500"}`}>Columnas críticas</div>
                          <div className="text-base font-bold">{item.criticalColumnsCount}</div>
                        </div>
                        <div className="col-span-2">
                          <div className={`text-[11px] ${isActive ? "text-white/70" : "text-slate-500"}`}>Cols. con nulls ≥ 90%</div>
                          <div className="text-base font-bold">{item.columnsOver90.length}</div>
                        </div>
                        <div className="col-span-1 text-right">
                          <span
                            className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-semibold ${
                              isActive
                                ? "border-white/20 bg-white/10 text-white"
                                : item.critical >= 50
                                ? "border-rose-200 bg-rose-50 text-rose-700"
                                : item.critical >= 10
                                ? "border-amber-200 bg-amber-50 text-amber-700"
                                : "border-emerald-200 bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {item.critical >= 50 ? "Alta" : item.critical >= 10 ? "Media" : "Controlada"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Card>

            {activeQualityDetail ? (
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                <Card className="p-5 xl:col-span-3">
                  <SectionHeader
                    n={2}
                    title={`Detalle de ${activeQualityDetail.datasetName}`}
                    subtitle={`Corte ${activeQualityDetail.executionDate} · drilldown ejecutivo`}
                    icon={ClipboardCheck}
                  />

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border bg-slate-50 p-4">
                      <div className="text-[11px] uppercase tracking-wide text-slate-500">Estado de filas</div>
                      <div className="mt-3 space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-sm text-slate-700">
                            <span>Completas</span>
                            <span className={`font-semibold ${qualityTone(activeQualityDetail.complete)}`}>
                              {fmtPct(activeQualityDetail.complete)}
                            </span>
                          </div>
                          <div className="mt-1">
                            <QualityMiniBar value={activeQualityDetail.complete} color="#16a34a" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm text-slate-700">
                            <span>Parciales</span>
                            <span className="font-semibold text-amber-700">{fmtPct(activeQualityDetail.partial)}</span>
                          </div>
                          <div className="mt-1">
                            <QualityMiniBar value={activeQualityDetail.partial} color="#f59e0b" />
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm text-slate-700">
                            <span>Críticas</span>
                            <span className={`font-semibold ${qualityTone(activeQualityDetail.critical, true)}`}>
                              {fmtPct(activeQualityDetail.critical)}
                            </span>
                          </div>
                          <div className="mt-1">
                            <QualityMiniBar value={activeQualityDetail.critical} color="#e11d48" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border bg-slate-50 p-4">
                      <div className="text-[11px] uppercase tracking-wide text-slate-500">Salud estructural</div>
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <StatBox label="Zona" value={String(activeQualityDetail.zone).toUpperCase()} />
                        <StatBox label="Columnas perfiladas" value={`${activeQualityDetail.columnsCount}`} />
                        <StatBox label="Promedio missing" value={fmtPct(activeQualityDetail.averageMissing)} />
                        <StatBox label="Críticas" value={`${activeQualityDetail.criticalColumnsCount}`} tone="primary" />
                        <StatBox label="Nulls ≥ 90%" value={`${activeQualityDetail.columnsOver90.length}`} />
                      </div>
                      <div className="mt-4 rounded-xl border bg-white p-3">
                        <div className="text-[11px] text-slate-500">Cobertura de metadatos del producto gold</div>
                        {activeQualityDetail.metadataCoverage !== null ? (
                          <>
                            <div className={`mt-1 text-lg font-bold ${qualityTone(activeQualityDetail.metadataCoverage)}`}>
                              {fmtPct(activeQualityDetail.metadataCoverage)}
                            </div>
                            <div className="mt-2">
                              <QualityMiniBar value={activeQualityDetail.metadataCoverage} color={brand.secondary} />
                            </div>
                            <div className="mt-2 text-[12px] text-slate-600">
                              Con comentario: {activeQualityDetail.metadataWithComment} · Sin comentario:{" "}
                              {activeQualityDetail.metadataWithoutComment}
                            </div>
                          </>
                        ) : (
                          <div className="mt-2 text-sm text-slate-600">
                            Sin cobertura en `dq_metadata.csv` para este dataset.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border bg-white p-4">
                      <div className="text-sm font-semibold text-slate-900">Llaves y columnas críticas declaradas</div>
                      <p className="text-[12px] text-slate-600 mt-2 leading-relaxed">
                        {activeQualityDetail.criticalColumnsLabel || "Sin columnas críticas declaradas"}
                      </p>
                    </div>
                    <div className="rounded-2xl border bg-white p-4">
                      <div className="text-sm font-semibold text-slate-900">Lectura ejecutiva</div>
                      <p className="text-[12px] text-slate-600 mt-2 leading-relaxed">
                        {activeQualityDetail.critical >= 50
                          ? "Se requiere intervención prioritaria sobre llaves y atributos críticos: la tabla compromete consumo y confianza."
                          : activeQualityDetail.critical >= 10
                          ? "La tabla es utilizable, pero requiere estabilizar las reglas críticas antes de escalar su consumo."
                          : "La tabla muestra una base estable en sus campos clave; el foco pasa a sostenimiento y monitoreo continuo."}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-5 xl:col-span-2">
                  <SectionHeader
                    n={3}
                    title="Top columnas críticas"
                    subtitle="Detalle por columna para profundizar sobre los campos clave"
                    icon={AlertTriangle}
                  />
                  <div className="mt-5 space-y-3">
                    {qualityDashboard.topCriticalColumns.map((item) => (
                      <div key={`${item.datasetName}-${item.columnName}-${item.executionDate}`} className="rounded-2xl border bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{item.columnName}</div>
                            <div className="text-[12px] text-slate-500">
                              {item.datasetName} · {item.executionDate}
                            </div>
                          </div>
                          <div className={`text-sm font-bold ${qualityTone(item.missingPct, true)}`}>
                            {fmtPct(item.missingPct)}
                          </div>
                        </div>
                        <div className="mt-3">
                          <QualityMiniBar value={item.missingPct} color="#e11d48" />
                        </div>
                        <div className="mt-2 text-[12px] text-slate-600">
                          Registros faltantes: {item.missingCount.toLocaleString("es-CO")}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ) : null}

            <Card className="p-5">
              <SectionHeader
                n={4}
                title="Notas para la presentación"
                subtitle="Mensajes que conviene decir explícitamente en comité"
                icon={Info}
              />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">1. Calidad observable</div>
                  <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                    Ya existe monitoreo real por zona, por tabla y por columna crítica, no solo intención de control.
                  </p>
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">2. Priorización clara</div>
                  <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                    `dq_dataset` permite enfocar remediación donde las llaves y campos más importantes ya afectan confianza operativa.
                  </p>
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">3. Limitación actual</div>
                  <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                    El corte combina fechas distintas y hoy solo hay metadatos para productos `gold`, por eso cada tabla expone su zona y fecha.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ) : mode === "cambio" ? (
          <div className="mt-6 space-y-6">
            <Card className="p-5">
              <div className="text-xs uppercase tracking-wide text-slate-500">Speech sugerido</div>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">{SPEECH.cambio}</p>
            </Card>
            <Card className="p-5">
              <SectionHeader
                n={1}
                title="Gestión del Cambio (ADKAR)"
                subtitle="Cambio cultural y adopción operativa como eje de sostenibilidad"
                icon={Users}
              />

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Comunicaciones</div>
                  <BulletList items={CAMBIO.accionesImplementadas.comunicaciones} />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Movilización</div>
                  <BulletList items={CAMBIO.accionesImplementadas.movilizacion} />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Capacitación</div>
                  <BulletList items={CAMBIO.accionesImplementadas.capacitacion} />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Diagnóstico ADKAR</div>
                  <BulletList items={CAMBIO_METRICS.adkar} />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Impactos clave</div>
                  <BulletList
                    items={[
                      CAMBIO_METRICS.kci,
                      CAMBIO_METRICS.planes,
                      `Dimensiones impactadas: ${CAMBIO_METRICS.dimensiones.join(", ")}`,
                    ]}
                  />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Avance de mitigaciones</div>
                  <div className="mt-3 space-y-3">
                    {CAMBIO_METRICS.avance.map((a) => (
                      <div key={a.label} className="rounded-xl border bg-white p-3">
                        <div className="flex items-center justify-between text-[12px] text-slate-700">
                          <span className="font-semibold">{a.label}</span>
                          <span className="text-slate-600">{a.value}%</span>
                        </div>
                        <div className="mt-2">
                          <ProgressBar value={a.value} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">Siguientes pasos por roles</div>
                <BulletList items={CAMBIO.proximosPasos} />
              </div>

              <div className="mt-4 rounded-2xl border bg-amber-50 p-4">
                <div className="text-sm font-semibold text-amber-900 inline-flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Riesgo inmediato
                </div>
                <p className="text-sm text-amber-900 mt-2">{CAMBIO.riesgo}</p>
              </div>

              <div className="mt-4 rounded-2xl border bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">Lectura ejecutiva para Gerencia General</div>
                <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                  El cambio ya no es solo comunicación: se está institucionalizando con roles formales, comités,
                  planes de mitigación y capacitación por audiencias. La sostenibilidad del Gobierno del Dato
                  depende de mantener esta cadencia y medir la adopción por dominio.
                </p>
              </div>

              <div className="mt-4 rounded-2xl border bg-slate-900 p-4 text-white">
                <div className="text-xs uppercase tracking-wide text-white/70">Mensaje clave</div>
                <div className="text-lg md:text-xl font-extrabold mt-1">{CAMBIO.mensajeGrande}</div>
              </div>
            </Card>
          </div>
        ) : mode === "cierre" ? (
          <div className="mt-6 space-y-6">
            <Card className="p-5">
              <div className="text-xs uppercase tracking-wide text-slate-500">Speech sugerido</div>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">{SPEECH.cierre}</p>
            </Card>
            <Card className="p-5">
              <SectionHeader
                n={1}
                title="Evolución objetiva de madurez"
                subtitle="Del diagnóstico base a evidencia operativa (no solo percepción)"
                icon={TrendingUp}
              />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Base vs. avance medible</div>
                  <BulletList
                    items={[
                      "Línea base: 2.2 / 5 (diagnóstico sectorial)",
                      "Aumento objetivo sustentado por entregables cerrados:",
                      "— Gobierno declarativo formalizado (roles, RACI, KPIs)",
                      "— Comité activo con decisiones y minutas",
                      "— Arquitectura To‑Be + transición con roadmap definido",
                      "Meta ciclo 1: 2.6–2.8 / 5 con operación sostenida",
                    ]}
                  />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Indicadores de gobierno</div>
                  <BulletList items={GOB_DECLARATIVO_KPIS} />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Impacto en el negocio</div>
                  <BulletList
                    items={[
                      "Reducción de reprocesos y duplicidad (Maestro Agricultor)",
                      "Trazabilidad y auditoría de datos críticos",
                      "Autonomía de gerencias con roles activos",
                    ]}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={2}
                title="Ruta de madurez hacia 4.5 (con gap controlado)"
                subtitle="Timeline vertical alineado al roadmap"
                icon={GitBranch}
              />
              <div className="mt-5 space-y-4">
                {MADUREZ_TIMELINE.map((m, idx) => (
                  <div key={`${m.label}-${idx}`} className="relative pl-6">
                    <span className="absolute left-0 top-2 w-2.5 h-2.5 rounded-full" style={{ background: brand.secondary }} />
                    <div className="rounded-xl border bg-white p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold text-slate-900">{m.label}</div>
                        <div className="text-[11px] px-2 py-0.5 rounded-full border bg-slate-50 text-slate-600">
                          {m.window}
                        </div>
                      </div>
                      <div className="mt-1 text-sm text-slate-700">Meta de madurez: <strong>{m.target}</strong></div>
                      <div className="text-[12px] text-slate-500 mt-1">{m.note}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-slate-500">
                Nota: siempre existirá un gap residual; el objetivo es mantenerlo controlado y visible con gobierno activo.
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={3}
                title="Por qué es clave el acompañamiento"
                subtitle="Beneficio tangible de una segunda ronda de consultoría"
                icon={ShieldCheck}
              />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Arquitectura híbrida y transición</div>
                  <BulletList
                    items={[
                      "Asegurar convivencia controlada AS‑IS → Transición → TO‑BE",
                      "Priorizar dominios críticos con menor riesgo operativo",
                      "Acelerar automatización y reducir dependencia de Excel",
                    ]}
                  />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Gobierno declarativo en operación</div>
                  <BulletList
                    items={[
                      "Implementar KPIs y tableros de gobierno",
                      "Acompañar comités y decisiones con evidencia",
                      "Asegurar adopción de data contracts y metadatos",
                    ]}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={4}
                title="Conclusión ejecutiva"
                subtitle="Valor de continuidad y retorno medible"
                icon={Info}
              />
              <p className="text-sm text-slate-700 leading-relaxed">
                La compañía ya tiene el diseño y los activos en marcha; el mayor retorno ahora está en acelerar la
                operación y la adopción. Una segunda ronda de consultoría asegura continuidad, reduce riesgos de
                ejecución y habilita un salto de madurez medible en 6–12 meses.
              </p>
            </Card>
          </div>
        ) : mode === "cierreFinal" ? (
          <div className="mt-6 space-y-6">
            <Card className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold tracking-tight">Cierre del Proyecto y Continuidad</h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Estado final, capacidades instaladas, evolución IMTA y próximos pasos
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full border bg-amber-100 text-amber-800 border-amber-300">
                  Cierre administrativo en curso
                </span>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-6 gap-4">
                <StatBox label="Avance real" value={fmtPct(CIERRE_FINAL.avanceReal)} tone="primary" />
                <StatBox label="Gap" value={fmtPct(CIERRE_FINAL.gap)} />
                <StatBox label="Pendientes de cierre" value={`${CIERRE_FINAL.pendientesCierre.length}`} />
                <div className="rounded-xl bg-slate-50 border p-3">
                  <div className="text-[11px] text-slate-500">Avance Dominio (Agricultor)</div>
                  <div className="text-base font-bold text-amber-700">
                    {dominioAgricultor ? `${dominioAgricultor.avanceTecnico}%` : "N/D"}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                      En construcción
                    </span>
                  </div>
                </div>
                <div className="rounded-xl bg-slate-50 border p-3">
                  <div className="text-[11px] text-slate-500">IMTA actual</div>
                  <div className="text-base font-bold text-sky-800">{CIERRE_FINAL.imta.current}/100</div>
                  <div className="text-[11px] text-slate-500 mt-1">Delta vs baseline: +{imtaDelta}</div>
                </div>
                <div className="rounded-xl bg-slate-50 border p-3">
                  <div className="text-[11px] text-slate-500">Gobierno operativo</div>
                  <div className="text-base font-bold text-emerald-700">Activo</div>
                  <div className="text-[11px] text-slate-500 mt-1">Comités y roles en ejecución</div>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader n={1} title="Cierre administrativo" subtitle="Checklist final y próximos hitos de cierre" icon={ClipboardCheck} />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Checklist pendiente</div>
                  <BulletList items={CIERRE_FINAL.pendientesCierre} />
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-sm font-semibold text-slate-900">Hito de control</div>
                  <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                    El proyecto está en <strong>{fmtPct(CIERRE_FINAL.avanceReal)}</strong> vs.{" "}
                    <strong>{fmtPct(CIERRE_FINAL.avanceEsperado)}</strong> esperado (gap{" "}
                    <strong>{fmtPct(CIERRE_FINAL.gap)}</strong>). El cierre se completa al ejecutar los hitos
                    administrativos y formalizar el acta.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={2}
                title="Estado por dominios (cobertura técnica)"
                subtitle="Diferencia entre avance de delivery por dominio vs avance del proyecto"
                icon={Target}
              />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {CIERRE_FINAL.dominioEstado.map((d) => (
                  <div key={d.nombre} className="rounded-2xl border bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-slate-900">{d.nombre}</div>
                      <div className="text-sm font-bold text-slate-800">{d.avanceTecnico}%</div>
                    </div>
                    <div className="mt-2">
                      <ProgressBar value={d.avanceTecnico} />
                    </div>
                    <p className="text-[12px] text-slate-600 mt-2">{d.nota}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border bg-white p-4 text-sm text-slate-700">
                <strong>Lectura:</strong> el dominio Agricultor está en construcción, pero acelera porque reutiliza
                capacidad instalada del dominio Proveedor ya implementado.
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={3}
                title="Calidad y transición de tablero"
                subtitle="Sustitución temporal del dashboard Power BI y estado del frente de calidad"
                icon={ShieldCheck}
              />
              <div className="mt-5 rounded-2xl border bg-slate-50 p-4">
                <p className="text-sm text-slate-700 leading-relaxed">{CALIDAD_TRANSICION.contexto}</p>
              </div>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Frente completado</div>
                  <BulletList items={CALIDAD_TRANSICION.logros} />
                </div>
                <div className="rounded-2xl border bg-white p-4">
                  <div className="text-sm font-semibold text-slate-900">Pendientes para cierre completo</div>
                  <BulletList items={CALIDAD_TRANSICION.pendientes} tone="primary" />
                  <div className="mt-4 rounded-xl border bg-amber-50 p-3 text-[12px] text-amber-900">
                    Lectura ejecutiva: ya existe medición y evidencia operativa de calidad; lo pendiente es formalizar
                    el cruce final para clasificación de agricultores y entregar el dashboard definitivo.
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={4}
                title="Capacidad instalada"
                subtitle="Qué queda funcionando después del cierre"
                icon={Layers}
              />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Técnica</div>
                  <BulletList items={CIERRE_FINAL.tecnicaResumenBullets} />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Gobierno</div>
                  <BulletList
                    items={[
                      "Gobierno declarativo formalizado con política, roles y RACI",
                      "Comités táctico y operativo activos con cadencia definida",
                      "Publicación de activos y lineamientos en entorno AWS de gobierno",
                    ]}
                  />
                </div>
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">Gestión del cambio</div>
                  <div className="text-[12px] font-semibold text-slate-700 mt-2">Logros</div>
                  <BulletList items={CIERRE_FINAL.logrosCambio} />
                  <div className="text-[12px] font-semibold text-slate-700 mt-3">Pendientes</div>
                  <BulletList items={CIERRE_FINAL.pendientesCambio} />
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={5}
                title="Evolución IMTA"
                subtitle="IMTA = Índice de Madurez de Transición Arquitectónica (numérico y trazable)"
                icon={TrendingUp}
              />
              <div className="mt-5 rounded-2xl border bg-white p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-xl border bg-slate-50 p-4 md:col-span-2">
                    <div className="text-sm font-semibold text-slate-900">IMTA actual: {CIERRE_FINAL.imta.current}/100</div>
                    <div className="text-[12px] text-slate-600 mt-1">
                      Baseline: {CIERRE_FINAL.imta.baseline} · Delta: +{imtaDelta} · Meta Quick Wins: {CIERRE_FINAL.imta.targetQuickWins}
                    </div>
                    <div className="mt-3">
                      <ProgressBar value={CIERRE_FINAL.imta.current} />
                    </div>
                  </div>
                  <div className="rounded-xl border bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-900">Fórmula visible</div>
                    <div className="text-[12px] text-slate-700 mt-2 leading-relaxed">
                      IMTA = (Gob + Meta + Calidad + Arq) / 100
                    </div>
                    <div className="text-[12px] text-slate-600 mt-2">
                      ({imtaTotalScore}/{imtaTotalMax}) × 100 = <strong>{imtaComputed}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {CIERRE_FINAL.imta.dimensions.map((d) => (
                  <div key={d.key} className="rounded-2xl border bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-slate-900">{d.key}</div>
                      <div className="inline-flex items-center gap-2">
                        <span className="text-sm font-bold text-emerald-700">{d.delta}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full border bg-white text-slate-700">{d.estado}</span>
                      </div>
                    </div>
                    <div className="text-[12px] text-slate-600 mt-1">
                      {d.score}/{d.max}
                    </div>
                    <div className="mt-2">
                      <ProgressBar value={(d.score / d.max) * 100} />
                    </div>
                    <p className="text-[12px] text-slate-600 mt-2">{d.evidencia}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border bg-white p-4 text-sm text-slate-700">
                El IMTA mide madurez/capacidad instalada; el avance del dominio mide cobertura técnica.
                Pueden avanzar a ritmos distintos.
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={6}
                title="Grafo explicativo: ejecución → IMTA → calificación global"
                subtitle="Causalidad visible entre capacidades activadas, madurez de transición y score global de Gobierno del Dato"
                icon={Workflow}
              />
              <div className="mt-5 rounded-2xl border bg-white p-4 md:p-5 overflow-x-auto">
                <div className="min-w-[860px]">
                  <div className="grid grid-cols-12 gap-3 text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
                    <div className="col-span-4">Evidencia / Capacidades activadas</div>
                    <div className="col-span-4 text-center">IMTA por dimensiones</div>
                    <div className="col-span-4 text-right">Calificación global (medición del proyecto)</div>
                  </div>

                  <div className="mt-3 space-y-3">
                    {CIERRE_FINAL.imtaCausalRows.map((row) => {
                      const dim = imtaByKey[row.dimensionKey];
                      const globalDim = globalByKey[row.globalKey];
                      const globalDeltaDim = globalDim
                        ? Number((globalDim.current - globalDim.baseline).toFixed(1))
                        : 0;
                      return (
                        <div key={row.id} className="grid grid-cols-12 items-center gap-3">
                          <div className="col-span-4 group relative rounded-xl border bg-slate-50 px-3 py-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-sm font-semibold text-slate-900">{row.evidenciaTitulo}</div>
                              <span className="text-[10px] px-2 py-0.5 rounded-full border bg-white text-slate-700">
                                {row.evidenciaEstado}
                              </span>
                            </div>
                            <div className="absolute left-0 top-full z-20 mt-1 hidden w-full rounded-lg border bg-slate-900 px-2 py-1 text-[11px] text-white group-hover:block">
                              {row.evidenciaTooltip}
                            </div>
                          </div>

                          <div className="col-span-1 flex justify-center text-slate-400">
                            <ArrowRight className="h-4 w-4" />
                          </div>

                          <div className="col-span-3 group relative rounded-xl border bg-sky-50 px-3 py-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-sm font-semibold text-slate-900">{row.dimensionKey}</div>
                              <span className="text-[10px] px-2 py-0.5 rounded-full border bg-white text-slate-700">
                                {dim?.estado || "En transición"}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-600 mt-1">
                              {dim ? `${dim.score}/${dim.max}` : "N/D"}
                            </div>
                            <div className="absolute left-0 top-full z-20 mt-1 hidden w-full rounded-lg border bg-slate-900 px-2 py-1 text-[11px] text-white group-hover:block">
                              {dim?.evidencia || "Sin evidencia cargada"}
                            </div>
                          </div>

                          <div className="col-span-1 flex justify-center text-slate-400">
                            <ArrowRight className="h-4 w-4" />
                          </div>

                          <div className="col-span-3 group relative rounded-xl border bg-emerald-50 px-3 py-2">
                            <div className="flex items-center justify-between gap-2">
                              <div className="text-sm font-semibold text-slate-900">{row.globalKey}</div>
                              <span className="text-[10px] px-2 py-0.5 rounded-full border bg-white text-slate-700">
                                {CIERRE_FINAL.globalScore.mode === "MODE_A"
                                  ? `+${globalDeltaDim}`
                                  : globalDim?.estado || CIERRE_FINAL.globalScore.estado}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-600 mt-1">
                              {CIERRE_FINAL.globalScore.mode === "MODE_A"
                                ? `${globalDim?.current?.toFixed(1) ?? "N/D"}${CIERRE_FINAL.globalScore.scale}`
                                : globalDim?.estado || CIERRE_FINAL.globalScore.estado}
                            </div>
                            <div className="absolute left-0 top-full z-20 mt-1 hidden w-full rounded-lg border bg-slate-900 px-2 py-1 text-[11px] text-white group-hover:block">
                              Calificación global de {row.globalKey} con medición trazable del proyecto.
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 grid grid-cols-12 items-center gap-3">
                    <div className="col-span-5" />
                    <div className="col-span-3 rounded-xl border bg-sky-100 px-3 py-2">
                      <div className="text-sm font-semibold text-slate-900">IMTA total</div>
                      <div className="text-[11px] text-slate-700">{imtaComputed}/100 (actual: {CIERRE_FINAL.imta.current}/100)</div>
                    </div>
                    <div className="col-span-1 flex justify-center text-slate-400">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div className="col-span-3 rounded-xl border bg-emerald-100 px-3 py-2">
                      <div className="text-sm font-semibold text-slate-900">Calificación global total</div>
                      <div className="text-[11px] text-slate-700">
                        {CIERRE_FINAL.globalScore.mode === "MODE_A"
                          ? `${CIERRE_FINAL.globalScore.current.toFixed(1)}${CIERRE_FINAL.globalScore.scale} (Δ +${globalScoreDelta})`
                          : CIERRE_FINAL.globalScore.estado}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border bg-white p-4 text-sm text-slate-700 space-y-2">
                <p>
                  IMTA es el puente entre ejecución y madurez: cada capacidad instalada incrementa dimensiones IMTA y
                  se refleja en la calificación global de Gobierno del Dato.
                </p>
                <p>
                  El avance no es declarativo: se soporta en evidencia (comités, roles, catálogo, calidad,
                  arquitectura).
                </p>
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={6}
                title="Próximo hito: Quick Wins (8 semanas)"
                subtitle="Foco en impacto operativo y aceleración del IMTA"
                icon={GitBranch}
              />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {CIERRE_FINAL.quickWins.map((q) => (
                  <div key={q.titulo} className="rounded-2xl border bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-900">{q.titulo}</div>
                    <div className="mt-2 text-[12px] text-slate-700"><strong>Objetivo:</strong> {q.objetivo}</div>
                    <div className="mt-1 text-[12px] text-slate-700"><strong>Entregable:</strong> {q.entregable}</div>
                    <div className="mt-2 text-[11px] text-slate-600">
                      Impacto IMTA: {q.impactoIMTA.join(" · ")}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border bg-white p-4 text-sm text-slate-700">
                <strong>IMTA esperado:</strong> {CIERRE_FINAL.imtaEsperado}
              </div>
            </Card>

            <Card className="p-5">
              <SectionHeader
                n={7}
                title="Mensaje final para Gerencia General"
                subtitle="Cierre ejecutivo"
                icon={Info}
              />
              <p className="text-sm text-slate-700 leading-relaxed">{CIERRE_FINAL.mensajeFinal}</p>
            </Card>
          </div>
        ) : (
          // ==============================
          // Vista detalle (Fase 3)
          // ==============================
          <div className="mt-6 space-y-6">
            <Card className="p-5">
              <div className="text-xs uppercase tracking-wide text-slate-500">Speech sugerido</div>
              <p className="text-sm text-slate-700 mt-2 leading-relaxed">{SPEECH.fase3}</p>
            </Card>
            {/* 1. INDICADORES */}
            <Card className="p-5">
              <SectionHeader
                n={1}
                title="Indicadores de ejecución"
                subtitle="Proyecto total vs. Fase 3 vs. Cambio (planes humanos y KCI´s)"
                icon={TrendingUp}
              />
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <KPIBlock
                  title="Proyecto Total"
                  icon={TrendingUp}
                  esperado={KPIS.proyectoTotal.esperado}
                  real={KPIS.proyectoTotal.real}
                  spi={KPIS.proyectoTotal.spi}
                />
                <KPIBlock
                  title="Fase 3"
                  icon={ClipboardCheck}
                  esperado={KPIS.fase2.esperado}
                  real={KPIS.fase2.real}
                  spi={KPIS.fase2.spi}
                />
                <KPIBlock
                  title="Cambio (ADKAR, comunicaciones, capacitación)"
                  icon={Users}
                  esperado={KPIS.cambio.esperado}
                  real={KPIS.cambio.real}
                  spi={KPIS.cambio.spi}
                />
              </div>
            </Card>
            {/* 2. QUÉ SE CIERRA */}
            <Card className="p-5">
              <SectionHeader
                n={2}
                title="Cierre Fase 2 (diseño completo)"
                subtitle="Base declarativa lista: Gobierno, Arquitectura To‑Be/Transición y procedimientos"
                icon={Layers}
              />

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: brand.primary }} />
                    <div className="text-sm font-semibold text-slate-900">Arquitectura To‑Be</div>
                  </div>
                  <BulletList items={CIERRE_FASE2.arquitectura} />
                </div>

                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: brand.secondary }} />
                    <div className="text-sm font-semibold text-slate-900">Modelo Operativo (Híbrido)</div>
                  </div>
                  <BulletList items={CIERRE_FASE2.modeloOperativo} />
                </div>

                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: brand.primary }} />
                    <div className="text-sm font-semibold text-slate-900">Procedimientos & Roadmap</div>
                  </div>
                  <BulletList items={CIERRE_FASE2.procedimientosRoadmap} />
                </div>
              </div>

              <div className="mt-5 rounded-2xl border bg-white p-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 mt-0.5" style={{ color: brand.secondary }} />
                  <p className="text-sm text-slate-700">
                    <strong>Mensaje clave para mañana:</strong> {CIERRE_FASE2.mensajeClave}
                  </p>
                </div>
              </div>
            </Card>

            {/* 3 + 4: CAMBIO + CDO */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-5 lg:col-span-2">
                <SectionHeader
                  n={3}
                  title="Cambio (detalle y próximos pasos)"
                  subtitle="Asegura adopción y reduce la sensación de “parálisis por análisis”"
                  icon={Users}
                />

                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-2xl border bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-900 inline-flex items-center gap-2">
                      <Workflow className="w-4 h-4" style={{ color: brand.secondary }} /> Comunicaciones
                    </div>
                    <BulletList items={CAMBIO.accionesImplementadas.comunicaciones} tone="secondary" />
                  </div>
                  <div className="rounded-2xl border bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-900 inline-flex items-center gap-2">
                      <Target className="w-4 h-4" style={{ color: brand.secondary }} /> Movilización
                    </div>
                    <BulletList items={CAMBIO.accionesImplementadas.movilizacion} tone="secondary" />
                  </div>
                  <div className="rounded-2xl border bg-slate-50 p-4">
                    <div className="text-sm font-semibold text-slate-900 inline-flex items-center gap-2">
                      <Users className="w-4 h-4" style={{ color: brand.secondary }} /> Capacitación
                    </div>
                    <BulletList items={CAMBIO.accionesImplementadas.capacitacion} tone="secondary" />
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border bg-white p-4">
                  <div className="text-sm font-semibold text-slate-900 inline-flex items-center gap-2">
                    <Target className="w-4 h-4" style={{ color: brand.secondary }} /> Siguientes pasos por roles
                  </div>
                  <BulletList items={CAMBIO.proximosPasos} tone="secondary" />
                </div>

                <div className="mt-4 rounded-2xl border bg-amber-50 p-4">
                  <div className="text-sm font-semibold text-amber-900 inline-flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Riesgo inmediato
                  </div>
                  <p className="text-sm text-amber-900 mt-2">{CAMBIO.riesgo}</p>
                </div>
                <div className="mt-4 rounded-2xl border bg-slate-900 p-4 text-white">
                  <div className="text-xs uppercase tracking-wide text-white/70">Mensaje clave</div>
                  <div className="text-lg md:text-xl font-extrabold mt-1">{CAMBIO.mensajeGrande}</div>
                </div>
                <img
                    src={organigramaCDO}
                    alt="Organigrama CDO Office"
                    className="w-full max-h-[420px] object-contain rounded-xl border"
                    />
              </Card>

              <Card className="p-5">
                <SectionHeader
                  n={4}
                  title="CDO como Oficina"
                  subtitle="Un hit visual para socializar el modelo"
                  icon={Building2}
                />

                <div className="mt-5 rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold" style={{ color: brand.secondary }}>
                    {CDO_OFFICE.title}
                  </div>

                  <div className="mt-3 space-y-2">
                    {CDO_OFFICE.roles.map((r) => (
                      <div key={r} className="rounded-xl border bg-white px-3 py-2 text-[12px] text-slate-700">
                        {r}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-dashed">
                    <div className="text-[12px] font-semibold text-slate-800">Comités</div>
                    <div className="mt-2 space-y-2">
                      {CDO_OFFICE.comites.map((c) => (
                        <div key={c.name} className="rounded-xl border bg-white px-3 py-2">
                          <div className="text-[12px] font-semibold" style={{ color: brand.primary }}>
                            {c.name}
                          </div>
                          <div className="text-[11px] text-slate-600">{c.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <OrgMini />
                </div>
              </Card>
            </div>

            {/* 5. ADELANTO FASE 3 */}
            <Card className="p-5">
              <SectionHeader
                n={5}
                title="Fase 3 en acción – Formación Casanare"
                subtitle="Gobierno operativo generando activos reales con control y trazabilidad"
                icon={GitBranch}
              />

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {FASE3_TESORERIA_SIEMBRA.map((s) => (
                  <div key={s.n} className="rounded-2xl border bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-white border shadow-sm flex items-center justify-center text-sm font-bold text-slate-900">
                          {s.n}
                        </div>
                        <div>
                          <div className={prioPill(s.prio)}>{s.prio}</div>
                          <div className="text-sm font-semibold text-slate-900 mt-1">{s.title}</div>
                        </div>
                      </div>
                      <ShieldCheck className="w-5 h-5" style={{ color: brand.primary }} />
                    </div>

                    <ul className="mt-3 space-y-2 text-sm text-slate-700">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-400" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-dashed bg-white p-4">
                <p className="text-sm text-slate-700">
                  <strong>Lectura ejecutiva:</strong> el “paso a la acción” se ve en activos reales: el Maestro Agricultor es
                  reutilizable, evita reprocesos y duplicidad, y habilita decisiones con trazabilidad.
                </p>
              </div>
            </Card>

            {/* 6. ROADMAP Y CIERRE */}
            <Card className="p-5">
              <SectionHeader
                n={6}
                title="Roadmap y cierre"
                subtitle="El Gobierno habilita el salto a ejecución (sin perder rigor)"
                icon={BookOpen}
              />

              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold" style={{ color: brand.secondary }}>
                    Cierre Fase 2 (completado)
                  </div>
                  <BulletList items={ROADMAP_CIERRE.quedaParaCerrar} tone="primary" />
                </div>

                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold" style={{ color: brand.secondary }}>
                    Señales de continuidad (Alta tracción)
                  </div>
                  <BulletList items={ROADMAP_CIERRE.senalesContinuidad} tone="secondary" />
                </div>

                <div className="rounded-2xl border bg-slate-50 p-4">
                  <div className="text-sm font-semibold" style={{ color: brand.secondary }}>
                    Mensaje final para Gerencia General
                  </div>
                  <p className="text-sm text-slate-700 mt-2 leading-relaxed">{ROADMAP_CIERRE.mensajeFinal}</p>

                  <div className="mt-4 rounded-2xl border bg-white p-4">
                    <div className="text-[12px] font-semibold text-slate-900 inline-flex items-center gap-2">
                      <Timer className="w-4 h-4" style={{ color: brand.primary }} /> Próximo hito
                    </div>
                    <p className="text-[12px] text-slate-600 mt-2">{ROADMAP_CIERRE.proximoHito}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 text-xs text-slate-500">
                Nota: Esta infografía resume el cierre de Fase 2 y el avance de Fase 3. Ajusta textos/fechas según el acta del comité.
              </div>
            </Card>
          </div>
        )}

        <div className="mt-8 text-xs text-slate-500 flex items-start gap-2">
          <Info className="w-4 h-4 mt-0.5" />
          <p>
            Azurian Consulting.
          </p>
        </div>
      </div>
    </div>
  );
}
