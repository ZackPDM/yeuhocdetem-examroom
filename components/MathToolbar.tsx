"use client";

import React, { useState } from "react";

interface MathToolbarProps {
  onInsert: (symbol: string) => void;
}

interface Symbol {
  label: string;
  value: string;
}

interface SymbolGroups {
  [key: string]: Symbol[];
}

export default function MathToolbar({ onInsert }: MathToolbarProps) {
  const symbolGroups: SymbolGroups = {
    "Chữ cái Hy Lạp": [
      { label: "α", value: "\\alpha" },
      { label: "β", value: "\\beta" },
      { label: "Γ", value: "\\Gamma" },
      { label: "γ", value: "\\gamma" },
      { label: "Δ", value: "\\Delta" },
      { label: "δ", value: "\\delta" },
      { label: "ε", value: "\\varepsilon" },
      { label: "ζ", value: "\\zeta" },
      { label: "η", value: "\\eta" },
      { label: "Θ", value: "\\Theta" },
      { label: "θ", value: "\\theta" },
      { label: "ι", value: "\\iota" },
      { label: "Λ", value: "\\Lambda" },
      { label: "λ", value: "\\lambda" },
      { label: "μ", value: "\\mu" },
      { label: "ν", value: "\\nu" },
      { label: "Ξ", value: "\\Xi" },
      { label: "ξ", value: "\\xi" },
      { label: "π", value: "\\pi" },
      { label: "ρ", value: "\\rho" },
      { label: "Σ", value: "\\Sigma" },
      { label: "σ", value: "\\sigma" },
      { label: "τ", value: "\\tau" },
      { label: "Υ", value: "\\Upsilon" },
      { label: "υ", value: "\\upsilon" },
      { label: "Φ", value: "\\Phi" },
      { label: "φ", value: "\\phi" },
      { label: "χ", value: "\\chi" },
      { label: "Ψ", value: "\\Psi" },
      { label: "ψ", value: "\\psi" },
      { label: "Ω", value: "\\Omega" },
      { label: "ω", value: "\\omega" },
    ],
    "Toán tử cơ bản": [
      { label: "+", value: "+" },
      { label: "−", value: "-" },
      { label: "×", value: "\\times" },
      { label: "÷", value: "\\div" },
      { label: "±", value: "\\pm" },
      { label: "∓", value: "\\mp" },
      { label: "!", value: "!" },
      { label: "¬", value: "\\neg" },
    ],
    "Toán tử quan hệ": [
      { label: "=", value: "=" },
      { label: "≠", value: "\\ne" },
      { label: "≤", value: "\\le" },
      { label: "≥", value: "\\ge" },
      { label: "≈", value: "\\approx" },
      { label: "≡", value: "\\equiv" },
      { label: "≅", value: "\\cong" },
      { label: "∼", value: "\\sim" },
      { label: "∝", value: "\\propto" },
      { label: "≐", value: "\\doteq" },
      { label: "≪", value: "\\ll" },
      { label: "≫", value: "\\gg" },
      { label: "⊂", value: "\\subset" },
      { label: "⊃", value: "\\supset" },
      { label: "⊆", value: "\\subseteq" },
      { label: "⊇", value: "\\supseteq" },
      { label: "∈", value: "\\in" },
      { label: "∉", value: "\\notin" },
      { label: "∋", value: "\\ni" },
    ],
    "Toán tử hai ngôi": [
      { label: "∩", value: "\\cap" },
      { label: "∪", value: "\\cup" },
      { label: "⊎", value: "\\uplus" },
      { label: "⊓", value: "\\sqcap" },
      { label: "⊔", value: "\\sqcup" },
      { label: "∨", value: "\\vee" },
      { label: "∧", value: "\\wedge" },
      { label: "⋅", value: "\\cdot" },
      { label: "∗", value: "\\ast" },
      { label: "⋆", value: "\\star" },
      { label: "†", value: "\\dagger" },
      { label: "‡", value: "\\ddagger" },
      { label: "⊕", value: "\\oplus" },
      { label: "⊖", value: "\\ominus" },
      { label: "⊗", value: "\\otimes" },
      { label: "⊘", value: "\\oslash" },
      { label: "⊙", value: "\\odot" },
      { label: "∘", value: "\\circ" },
      { label: "∖", value: "\\setminus" },
    ],
    "Tập hợp": [
      { label: "∅", value: "\\emptyset" },
      { label: "ℕ", value: "\\mathbb{N}" },
      { label: "ℤ", value: "\\mathbb{Z}" },
      { label: "ℚ", value: "\\mathbb{Q}" },
      { label: "ℝ", value: "\\mathbb{R}" },
      { label: "ℂ", value: "\\mathbb{C}" },
    ],
    "Logic": [
      { label: "∃", value: "\\exists" },
      { label: "∀", value: "\\forall" },
      { label: "⇒", value: "\\Rightarrow" },
      { label: "⇐", value: "\\Leftarrow" },
      { label: "⇔", value: "\\Leftrightarrow" },
      { label: "⟹", value: "\\Longrightarrow" },
      { label: "⟸", value: "\\Longleftarrow" },
      { label: "⟺", value: "\\iff" },
      { label: "⊤", value: "\\top" },
      { label: "⊥", value: "\\bot" },
    ],
    "Hình học": [
      { label: "∠", value: "\\angle" },
      { label: "△", value: "\\triangle" },
      { label: "∥", value: "\\parallel" },
      { label: "⊥", value: "\\perp" },
      { label: "⃗", value: "\\vec{}" },
      { label: "‾", value: "\\overline{}" },
    ],
    "Dấu ngoặc": [
      { label: "|", value: "|" },
      { label: "(", value: "(" },
      { label: ")", value: ")" },
      { label: "[", value: "[" },
      { label: "]", value: "]" },
      { label: "{", value: "\\{" },
      { label: "}", value: "\\}" },
      { label: "⌈", value: "\\lceil" },
      { label: "⌉", value: "\\rceil" },
      { label: "⌊", value: "\\lfloor" },
      { label: "⌋", value: "\\rfloor" },
      { label: "⟨", value: "\\langle" },
      { label: "⟩", value: "\\rangle" },
    ],
    "Mũi tên": [
      { label: "→", value: "\\to" },
      { label: "←", value: "\\gets" },
      { label: "↑", value: "\\uparrow" },
      { label: "↓", value: "\\downarrow" },
      { label: "⇒", value: "\\Rightarrow" },
      { label: "⇐", value: "\\Leftarrow" },
      { label: "⇑", value: "\\Uparrow" },
      { label: "⇓", value: "\\Downarrow" },
      { label: "⟶", value: "\\longrightarrow" },
      { label: "⟵", value: "\\longleftarrow" },
      { label: "↦", value: "\\mapsto" },
      { label: "⟼", value: "\\longmapsto" },
    ],
    "Khác": [
      { label: "√", value: "\\sqrt{}" },
      { label: "∞", value: "\\infty" },
      { label: "∂", value: "\\partial" },
      { label: "∇", value: "\\nabla" },
      { label: "ℓ", value: "\\ell" },
      { label: "ℜ", value: "\\Re" },
      { label: "ℑ", value: "\\Im" },
      { label: "#", value: "\\#" },
    ],
    "Hàm lượng giác": [
      { label: "sin", value: "\\sin" },
      { label: "cos", value: "\\cos" },
      { label: "tan", value: "\\tan" },
      { label: "arcsin", value: "\\arcsin" },
      { label: "arccos", value: "\\arccos" },
      { label: "arctan", value: "\\arctan" },
      { label: "sinh", value: "\\sinh" },
      { label: "cosh", value: "\\cosh" },
      { label: "tanh", value: "\\tanh" },
      { label: "csc", value: "\\csc" },
      { label: "sec", value: "\\sec" },
      { label: "cot", value: "\\cot" },
    ],
    "Tích phân & Tổng": [
      { label: "∫", value: "\\int" },
      { label: "∬", value: "\\iint" },
      { label: "∭", value: "\\iiint" },
      { label: "∑", value: "\\sum" },
      { label: "∏", value: "\\prod" },
      { label: "lim", value: "\\lim" },
    ],
  };

  const [activeGroup, setActiveGroup] = useState("Chữ cái Hy Lạp");
  const groupNames = Object.keys(symbolGroups);
  const currentSymbols = symbolGroups[activeGroup];

  const handleSymbolClick = (symbol: string) => {
    onInsert(symbol);
  };

  return (
    <div className="bg-navy/50 border border-gold/20 rounded mb-2">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gold/20 overflow-x-auto">
        {groupNames.map((group) => (
          <button
            key={group}
            onClick={() => setActiveGroup(group)}
            className={`px-2 py-1 text-xs rounded transition-colors whitespace-nowrap ${
              activeGroup === group
                ? "bg-gold text-navy font-semibold"
                : "bg-gold/20 text-gold border border-gold/50 hover:bg-gold/40"
            }`}
            aria-pressed={activeGroup === group}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Symbols Grid */}
      <div className="p-2 flex flex-wrap gap-1 max-h-64 overflow-y-auto">
        {currentSymbols.map((symbol) => (
          <button
            key={symbol.value}
            onClick={() => handleSymbolClick(symbol.value)}
            className="px-3 py-1 bg-gold/20 text-gold border border-gold/50 rounded hover:bg-gold/40 active:bg-gold/60 transition-colors text-sm font-medium"
            title={symbol.value}
            type="button"
          >
            {symbol.label}
          </button>
        ))}
      </div>
    </div>
  );
}
