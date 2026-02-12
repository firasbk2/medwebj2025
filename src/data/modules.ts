import { Bone, FlaskConical, Atom, BarChart3, Beaker, TestTubes, Microscope, HeartPulse, Circle } from "lucide-react";

export interface ModuleCategory {
  label: string;
  labelFr?: string;
  children?: ModuleCategory[];
  isFileLevel?: boolean;
}

export interface ModuleConfig {
  id: string;
  name: string;
  nameFr: string;
  icon: any;
  color: string;
  description: string;
  descriptionFr: string;
  tree: ModuleCategory[];
}

export const modules: ModuleConfig[] = [
  {
    id: "anatomy",
    name: "Anatomy",
    nameFr: "Anatomie",
    icon: Bone,
    color: "primary",
    description: "Study of the human body structure",
    descriptionFr: "Étude de la structure du corps humain",
    tree: [
      {
        label: "Cours",
        children: [
          {
            label: "Diapos",
            children: [
              {
                label: "Membre Supérieur",
                children: [
                  { label: "Arthrologie", isFileLevel: true },
                  { label: "Myologie", isFileLevel: true },
                  { label: "Angéiologie", isFileLevel: true },
                  { label: "Innervation", isFileLevel: true },
                ],
              },
              {
                label: "Membre Inférieur",
                children: [
                  { label: "Arthrologie", isFileLevel: true },
                  { label: "Myologie", isFileLevel: true },
                  { label: "Angéiologie", isFileLevel: true },
                  { label: "Innervation", isFileLevel: true },
                ],
              },
            ],
          },
          {
            label: "Polycopiés",
            children: [
              {
                label: "Membre Supérieur",
                children: [
                  { label: "Arthrologie", isFileLevel: true },
                  { label: "Myologie", isFileLevel: true },
                  { label: "Angéiologie", isFileLevel: true },
                  { label: "Innervation", isFileLevel: true },
                ],
              },
              {
                label: "Membre Inférieur",
                children: [
                  { label: "Arthrologie", isFileLevel: true },
                  { label: "Myologie", isFileLevel: true },
                  { label: "Angéiologie", isFileLevel: true },
                  { label: "Innervation", isFileLevel: true },
                ],
              },
            ],
          },
        ],
      },
      { label: "TP", isFileLevel: true },
    ],
  },
  {
    id: "biochimie",
    name: "Biochemistry",
    nameFr: "Biochimie",
    icon: FlaskConical,
    color: "neon-purple",
    description: "Chemical processes in living organisms",
    descriptionFr: "Processus chimiques dans les organismes vivants",
    tree: [
      {
        label: "Cours",
        children: [
          {
            label: "Diapos",
            children: [
              { label: "Les Lipides", isFileLevel: true },
              { label: "Les Protides", isFileLevel: true },
              { label: "Enzymologie", isFileLevel: true },
            ],
          },
          {
            label: "Polycopiés",
            children: [
              { label: "Les Lipides", isFileLevel: true },
              { label: "Les Protides", isFileLevel: true },
              { label: "Enzymologie", isFileLevel: true },
            ],
          },
        ],
      },
      { label: "TD", isFileLevel: true },
    ],
  },
  {
    id: "biophysique",
    name: "Biophysics",
    nameFr: "Biophysique",
    icon: Atom,
    color: "neon-green",
    description: "Physical principles of biological systems",
    descriptionFr: "Principes physiques des systèmes biologiques",
    tree: [
      {
        label: "Cours",
        children: [
          { label: "Ait Mansour", isFileLevel: true },
          { label: "Optique", isFileLevel: true },
          { label: "Electricité", isFileLevel: true },
          { label: "Radioactivité", isFileLevel: true },
        ],
      },
      { label: "TD", isFileLevel: true },
      { label: "TP", isFileLevel: true },
    ],
  },
  {
    id: "biostatistique",
    name: "Biostatistics",
    nameFr: "Biostatistique",
    icon: BarChart3,
    color: "primary",
    description: "Statistical analysis in medical research",
    descriptionFr: "Analyse statistique en recherche médicale",
    tree: [
      {
        label: "Pr. Boukheris",
        children: [
          { label: "Cours", isFileLevel: true },
          { label: "TD", isFileLevel: true },
        ],
      },
      {
        label: "Pr. Boudali",
        children: [
          { label: "Cours", isFileLevel: true },
          { label: "TD", isFileLevel: true },
        ],
      },
    ],
  },
  {
    id: "chimie-g",
    name: "General Chemistry",
    nameFr: "Chimie Générale",
    icon: Beaker,
    color: "neon-cyan",
    description: "Fundamental chemical principles",
    descriptionFr: "Principes chimiques fondamentaux",
    tree: [
      { label: "Cours", isFileLevel: true },
      { label: "TP", isFileLevel: true },
    ],
  },
  {
    id: "chimie-o",
    name: "Organic Chemistry",
    nameFr: "Chimie Organique",
    icon: TestTubes,
    color: "neon-purple",
    description: "Chemistry of carbon compounds",
    descriptionFr: "Chimie des composés du carbone",
    tree: [
      { label: "Cours", isFileLevel: true },
      { label: "TP", isFileLevel: true },
    ],
  },
  {
    id: "histology",
    name: "Histology",
    nameFr: "Histologie",
    icon: Microscope,
    color: "neon-green",
    description: "Study of tissue structure",
    descriptionFr: "Étude de la structure des tissus",
    tree: [
      { label: "Cours", isFileLevel: true },
      { label: "TP", isFileLevel: true },
    ],
  },
  {
    id: "cytologie",
    name: "Cytology",
    nameFr: "Cytologie",
    icon: Circle,
    color: "neon-cyan",
    description: "Study of cell structure and function",
    descriptionFr: "Étude de la structure et fonction des cellules",
    tree: [
      { label: "Cours", isFileLevel: true },
      { label: "TP", isFileLevel: true },
    ],
  },
  {
    id: "physiologie",
    name: "Physiology",
    nameFr: "Physiologie",
    icon: HeartPulse,
    color: "primary",
    description: "Functions of living organisms",
    descriptionFr: "Fonctions des organismes vivants",
    tree: [
      {
        label: "La Membrane Plasmique",
        children: [
          { label: "Cours", isFileLevel: true },
          { label: "Animations", isFileLevel: true },
          { label: "Lecture", isFileLevel: true },
        ],
      },
      {
        label: "Milieu Intérieur",
        children: [
          { label: "Cours", isFileLevel: true },
          { label: "Animations", isFileLevel: true },
          { label: "Lecture", isFileLevel: true },
        ],
      },
      {
        label: "Ligand-Récepteur",
        children: [
          { label: "Cours", isFileLevel: true },
          { label: "Animations", isFileLevel: true },
          { label: "Lecture", isFileLevel: true },
        ],
      },
      {
        label: "Système Nerveux Autonome",
        children: [
          { label: "Cours", isFileLevel: true },
          { label: "Animations", isFileLevel: true },
          { label: "Lecture", isFileLevel: true },
        ],
      },
      {
        label: "Électrophysiologie",
        children: [
          { label: "Cours", isFileLevel: true },
          { label: "Animations", isFileLevel: true },
          { label: "Lecture", isFileLevel: true },
        ],
      },
      {
        label: "Synapse",
        children: [
          { label: "Cours", isFileLevel: true },
          { label: "Animations", isFileLevel: true },
          { label: "Lecture", isFileLevel: true },
        ],
      },
      {
        label: "Muscle Squelettique",
        children: [
          { label: "Cours", isFileLevel: true },
          { label: "Animations", isFileLevel: true },
          { label: "Lecture", isFileLevel: true },
        ],
      },
      {
        label: "Bioénergie",
        children: [
          { label: "Cours", isFileLevel: true },
          { label: "Animations", isFileLevel: true },
          { label: "Lecture", isFileLevel: true },
        ],
      },
    ],
  },
];
