/**
 * مجموعة رسومات التلوين الثانية - حرفي (24 رسمة، viewBox 0 0 400 400)
 * خطوط مغلقة وأجزاء واضحة كي تبقى الفرشاة داخل كل جزء.
 */
(function () {
  const S = window.HARFI_SHAPES = window.HARFI_SHAPES || [];
  const add = (cat, name, svg) => S.push({ cat, name, svg });
  const eye = (x, y, r = 12) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"/><circle cx="${x + 2}" cy="${y + 2}" r="${r / 2.4}" fill="#2D3436" stroke="none"/>`;

  /* ===== حيوانات ===== */
  add('animal', 'جمل', `
    <path d="M70 250 Q80 170 140 170 Q170 110 200 170 Q225 120 255 170 Q290 175 300 220 L300 250 Z" fill="#fff"/>
    <path d="M290 215 Q310 150 320 110 L350 104 Q365 112 352 126 L338 128 Q330 180 310 240 Z" fill="#fff"/>
    <path d="M95 250 L95 350 L115 350 L118 250 Z" fill="#fff"/>
    <path d="M140 250 L140 350 L160 350 L162 250 Z" fill="#fff"/>
    <path d="M240 250 L240 350 L260 350 L262 250 Z" fill="#fff"/>
    <path d="M280 250 L280 350 L300 350 L300 250 Z" fill="#fff"/>
    <path d="M150 168 Q190 190 240 168 L235 205 Q190 220 155 205 Z" fill="#fff"/>
    <circle cx="340" cy="114" r="4" fill="#2D3436" stroke="none"/>
    <path d="M72 230 Q50 250 56 280" fill="none"/>
  `);
  add('animal', 'أسد', `
    <path d="M200 50 Q240 60 260 80 Q300 80 310 120 Q340 150 325 190 Q345 230 315 260 Q310 300 270 310 Q240 345 200 330 Q160 345 130 310 Q90 300 85 260 Q55 230 75 190 Q60 150 90 120 Q100 80 140 80 Q160 60 200 50 Z" fill="#fff"/>
    <circle cx="200" cy="200" r="88" fill="#fff"/>
    <circle cx="128" cy="130" r="22" fill="#fff"/>
    <circle cx="272" cy="130" r="22" fill="#fff"/>
    ${eye(168, 185)}${eye(232, 185)}
    <ellipse cx="200" cy="240" rx="40" ry="28" fill="#fff"/>
    <path d="M186 222 L214 222 L200 238 Z" fill="#fff"/>
    <path d="M200 238 Q185 260 172 250 M200 238 Q215 260 228 250" fill="none"/>
  `);
  add('animal', 'فيل', `
    <ellipse cx="220" cy="220" rx="120" ry="85" fill="#fff"/>
    <path d="M150 160 Q60 110 50 200 Q50 260 120 250 Z" fill="#fff"/>
    <path d="M120 220 Q80 260 90 320 Q100 345 115 330 Q110 280 145 250 Z" fill="#fff"/>
    <path d="M150 280 L150 350 L185 350 L185 290 Z" fill="#fff"/>
    <path d="M260 290 L260 350 L295 350 L295 280 Z" fill="#fff"/>
    <path d="M200 290 L200 340 L230 340 L230 295 Z" fill="#fff"/>
    ${eye(150, 190, 10)}
    <path d="M338 210 Q362 230 352 262" fill="none"/>
  `);
  add('animal', 'زرافة', `
    <path d="M190 90 L215 90 L230 250 L175 250 Z" fill="#fff"/>
    <ellipse cx="205" cy="80" rx="40" ry="26" fill="#fff"/>
    <ellipse cx="205" cy="280" rx="85" ry="50" fill="#fff"/>
    <path d="M140 300 L135 365 L155 365 L160 310 Z M180 320 L178 365 L198 365 L200 325 Z M215 325 L215 365 L235 365 L235 320 Z M255 305 L258 365 L278 365 L272 300 Z" fill="#fff"/>
    <path d="M190 56 L186 30 M222 56 L226 30" fill="none"/>
    <circle cx="186" cy="28" r="6" fill="#fff"/><circle cx="226" cy="28" r="6" fill="#fff"/>
    <circle cx="200" cy="140" r="10" fill="#fff"/><circle cx="210" cy="195" r="12" fill="#fff"/>
    <circle cx="170" cy="275" r="14" fill="#fff"/><circle cx="235" cy="270" r="14" fill="#fff"/>
    ${eye(190, 74, 7)}
  `);
  add('animal', 'سلحفاة', `
    <path d="M90 250 Q100 130 200 125 Q300 130 310 250 Z" fill="#fff"/>
    <path d="M150 250 L170 190 L230 190 L250 250 Z" fill="#fff"/>
    <path d="M170 190 L200 140 L230 190 Z" fill="#fff"/>
    <path d="M70 250 L330 250 L320 268 L80 268 Z" fill="#fff"/>
    <ellipse cx="350" cy="230" rx="34" ry="26" fill="#fff"/>
    <path d="M110 268 L105 305 L140 305 L140 268 Z M260 268 L260 305 L295 305 L290 268 Z" fill="#fff"/>
    <path d="M90 255 L55 270 L90 262 Z" fill="#fff"/>
    ${eye(358, 222, 7)}
  `);
  add('animal', 'بومة', `
    <ellipse cx="200" cy="220" rx="110" ry="130" fill="#fff"/>
    <path d="M110 120 L120 70 L160 105 Z M290 120 L280 70 L240 105 Z" fill="#fff"/>
    <ellipse cx="200" cy="270" rx="65" ry="70" fill="#fff"/>
    <circle cx="155" cy="165" r="36" fill="#fff"/><circle cx="245" cy="165" r="36" fill="#fff"/>
    ${eye(155, 165, 16)}${eye(245, 165, 16)}
    <path d="M190 195 L210 195 L200 220 Z" fill="#fff"/>
    <path d="M95 210 Q70 260 100 310 Q125 270 110 215 Z M305 210 Q330 260 300 310 Q275 270 290 215 Z" fill="#fff"/>
    <path d="M170 350 L165 370 M230 350 L235 370" fill="none"/>
  `);

  /* ===== مركبات ===== */
  add('vehicle', 'طائرة', `
    <path d="M60 210 Q60 180 110 180 L320 180 Q360 185 365 210 Q360 235 320 240 L110 240 Q60 240 60 210 Z" fill="#fff"/>
    <path d="M180 180 L240 80 L270 80 L240 180 Z" fill="#fff"/>
    <path d="M180 240 L240 340 L270 340 L240 240 Z" fill="#fff"/>
    <path d="M70 185 L45 120 L80 120 L110 180 Z" fill="#fff"/>
    <path d="M320 190 Q345 195 350 210 L320 210 Z" fill="#fff"/>
    <circle cx="140" cy="208" r="11" fill="#fff"/><circle cx="180" cy="208" r="11" fill="#fff"/><circle cx="220" cy="208" r="11" fill="#fff"/><circle cx="260" cy="208" r="11" fill="#fff"/>
  `);
  add('vehicle', 'قطار', `
    <path d="M200 140 L330 140 L330 300 L200 300 Z" fill="#fff"/>
    <path d="M60 190 L200 190 L200 300 L60 300 Z" fill="#fff"/>
    <path d="M90 120 L130 120 L130 190 L90 190 Z" fill="#fff"/>
    <path d="M80 100 L140 100 L130 120 L90 120 Z" fill="#fff"/>
    <path d="M230 165 L300 165 L300 225 L230 225 Z" fill="#fff"/>
    <path d="M330 300 L365 300 L330 250 Z" fill="#fff"/>
    <circle cx="100" cy="310" r="28" fill="#fff"/><circle cx="170" cy="310" r="28" fill="#fff"/>
    <circle cx="240" cy="310" r="28" fill="#fff"/><circle cx="305" cy="310" r="28" fill="#fff"/>
    <path d="M30 350 L370 350" fill="none"/>
  `);
  add('vehicle', 'حافلة', `
    <path d="M50 130 Q50 110 70 110 L330 110 Q355 110 355 140 L355 300 L50 300 Z" fill="#fff"/>
    <path d="M70 135 L120 135 L120 190 L70 190 Z M135 135 L185 135 L185 190 L135 190 Z M200 135 L250 135 L250 190 L200 190 Z M265 135 L335 135 L335 190 L265 190 Z" fill="#fff"/>
    <path d="M50 230 L355 230 L355 250 L50 250 Z" fill="#fff"/>
    <circle cx="335" cy="275" r="12" fill="#fff"/>
    <circle cx="110" cy="305" r="32" fill="#fff"/><circle cx="110" cy="305" r="12" fill="#fff"/>
    <circle cx="290" cy="305" r="32" fill="#fff"/><circle cx="290" cy="305" r="12" fill="#fff"/>
  `);
  add('vehicle', 'صاروخ', `
    <path d="M200 40 Q270 110 260 270 L140 270 Q130 110 200 40 Z" fill="#fff"/>
    <circle cx="200" cy="150" r="30" fill="#fff"/><circle cx="200" cy="150" r="18" fill="#fff"/>
    <path d="M140 210 L90 290 L140 280 Z M260 210 L310 290 L260 280 Z" fill="#fff"/>
    <path d="M170 270 L230 270 L220 295 L180 295 Z" fill="#fff"/>
    <path d="M180 295 Q200 370 220 295 Z" fill="#fff"/>
    <path d="M162 90 L238 90" fill="none"/>
  `);
  add('vehicle', 'دراجة', `
    <circle cx="110" cy="270" r="66" fill="#fff"/><circle cx="110" cy="270" r="50" fill="#fff"/>
    <circle cx="290" cy="270" r="66" fill="#fff"/><circle cx="290" cy="270" r="50" fill="#fff"/>
    <path d="M110 270 L170 170 L270 170 L290 270 M170 170 L200 270 L270 170 M200 270 L110 270" fill="none" stroke-width="7"/>
    <path d="M150 155 L195 155 Q200 168 190 172 L155 172 Z" fill="#fff"/>
    <path d="M265 170 L255 130 L290 125" fill="none" stroke-width="7"/>
    <circle cx="200" cy="270" r="14" fill="#fff"/>
  `);

  /* ===== طبيعة ===== */
  add('nature', 'نخلة', `
    <path d="M185 160 Q170 260 180 360 L222 360 Q212 260 215 160 Z" fill="#fff"/>
    <path d="M200 160 Q140 90 60 120 Q130 120 200 160 Z" fill="#fff"/>
    <path d="M200 160 Q260 90 340 120 Q270 120 200 160 Z" fill="#fff"/>
    <path d="M200 160 Q120 150 70 210 Q140 170 200 160 Z" fill="#fff"/>
    <path d="M200 160 Q280 150 330 210 Q260 170 200 160 Z" fill="#fff"/>
    <path d="M200 160 Q190 90 220 50 Q215 110 200 160 Z" fill="#fff"/>
    <circle cx="185" cy="180" r="12" fill="#fff"/><circle cx="210" cy="185" r="12" fill="#fff"/><circle cx="198" cy="200" r="12" fill="#fff"/>
    <ellipse cx="200" cy="364" rx="110" ry="14" fill="#fff"/>
  `);
  add('nature', 'قوس قزح', `
    <path d="M40 300 A160 160 0 0 1 360 300 L330 300 A130 130 0 0 0 70 300 Z" fill="#fff"/>
    <path d="M70 300 A130 130 0 0 1 330 300 L300 300 A100 100 0 0 0 100 300 Z" fill="#fff"/>
    <path d="M100 300 A100 100 0 0 1 300 300 L270 300 A70 70 0 0 0 130 300 Z" fill="#fff"/>
    <path d="M20 310 Q20 270 60 280 Q80 250 115 275 Q140 280 135 310 Z" fill="#fff"/>
    <path d="M265 310 Q260 280 290 278 Q320 250 345 282 Q385 280 380 310 Z" fill="#fff"/>
  `);
  add('nature', 'فطر', `
    <path d="M60 210 Q70 80 200 75 Q330 80 340 210 Z" fill="#fff"/>
    <path d="M150 210 L140 340 Q200 360 260 340 L250 210 Z" fill="#fff"/>
    <circle cx="130" cy="160" r="20" fill="#fff"/><circle cx="200" cy="120" r="22" fill="#fff"/><circle cx="270" cy="165" r="18" fill="#fff"/>
    <circle cx="200" cy="185" r="14" fill="#fff"/>
    <path d="M40 350 Q120 335 200 350 Q280 365 360 350" fill="none"/>
  `);
  add('nature', 'زهرة عباد الشمس', `
    <path d="M192 230 L192 360 L208 360 L208 230 Z" fill="#fff"/>
    <path d="M192 300 Q140 280 125 250 Q180 250 192 290 Z M208 320 Q260 300 275 270 Q220 270 208 310 Z" fill="#fff"/>
    <g fill="#fff">
      <ellipse cx="200" cy="70" rx="22" ry="40"/><ellipse cx="200" cy="230" rx="22" ry="40"/>
      <ellipse cx="120" cy="150" rx="40" ry="22"/><ellipse cx="280" cy="150" rx="40" ry="22"/>
      <ellipse cx="145" cy="95" rx="22" ry="38" transform="rotate(-45 145 95)"/><ellipse cx="255" cy="95" rx="22" ry="38" transform="rotate(45 255 95)"/>
      <ellipse cx="145" cy="205" rx="22" ry="38" transform="rotate(45 145 205)"/><ellipse cx="255" cy="205" rx="22" ry="38" transform="rotate(-45 255 205)"/>
    </g>
    <circle cx="200" cy="150" r="55" fill="#fff"/>
  `);

  /* ===== طعام ===== */
  add('food', 'بطيخة', `
    <path d="M40 160 L360 160 A160 160 0 0 1 40 160 Z" fill="#fff"/>
    <path d="M65 160 L335 160 A135 135 0 0 1 65 160 Z" fill="#fff"/>
    <g fill="#2D3436" stroke="none"><ellipse cx="140" cy="200" rx="6" ry="10"/><ellipse cx="200" cy="230" rx="6" ry="10"/><ellipse cx="260" cy="200" rx="6" ry="10"/><ellipse cx="170" cy="260" rx="6" ry="10"/><ellipse cx="230" cy="260" rx="6" ry="10"/></g>
  `);
  add('food', 'آيس كريم', `
    <path d="M130 200 L270 200 L200 370 Z" fill="#fff"/>
    <path d="M150 230 L250 230 M165 270 L235 270 M180 310 L220 310" fill="none"/>
    <path d="M120 205 Q100 150 150 140 Q160 90 200 100 Q240 90 250 140 Q300 150 280 205 Z" fill="#fff"/>
    <path d="M170 100 Q170 50 200 50 Q230 50 230 100 Q200 115 170 100 Z" fill="#fff"/>
    <circle cx="200" cy="38" r="14" fill="#fff"/>
  `);
  add('food', 'جزرة', `
    <path d="M130 120 Q200 90 250 140 Q260 170 230 200 L90 350 Q70 360 75 335 Z" fill="#fff"/>
    <path d="M220 115 Q230 50 260 40 Q255 90 240 125 Z M240 125 Q290 70 330 80 Q300 120 255 140 Z M250 145 Q310 130 340 150 Q300 175 255 160 Z" fill="#fff"/>
    <path d="M140 200 L165 215 M120 250 L140 262 M175 160 L200 175" fill="none"/>
  `);

  /* ===== فضاء ===== */
  add('space', 'كوكب زحل', `
    <circle cx="200" cy="200" r="95" fill="#fff"/>
    <path d="M30 230 Q30 180 200 170 Q370 180 370 230 Q370 270 200 260 Q30 270 30 230 Z M70 228 Q80 205 200 205 Q320 205 330 228 Q320 245 200 240 Q80 245 70 228 Z" fill="#fff" fill-rule="evenodd"/>
    <path d="M125 140 Q200 120 275 140" fill="none"/>
    <circle cx="60" cy="80" r="10" fill="#fff"/><circle cx="340" cy="90" r="8" fill="#fff"/><circle cx="320" cy="340" r="12" fill="#fff"/>
  `);
  add('space', 'رائد فضاء', `
    <circle cx="200" cy="120" r="75" fill="#fff"/>
    <ellipse cx="200" cy="125" rx="52" ry="42" fill="#fff"/>
    <path d="M130 190 L270 190 L285 320 L115 320 Z" fill="#fff"/>
    <path d="M165 220 L235 220 L235 270 L165 270 Z" fill="#fff"/>
    <path d="M130 195 L80 280 L105 295 L145 230 Z M270 195 L320 280 L295 295 L255 230 Z" fill="#fff"/>
    <path d="M125 320 L125 375 L190 375 L190 320 Z M210 320 L210 375 L275 375 L275 320 Z" fill="#fff"/>
    <circle cx="185" cy="245" r="10" fill="#fff"/><circle cx="215" cy="245" r="10" fill="#fff"/>
  `);
  add('space', 'قمر ونجوم', `
    <path d="M230 60 Q110 80 115 200 Q120 320 240 340 Q150 300 150 200 Q150 100 230 60 Z" fill="#fff"/>
    <polygon points="290,110 302,140 334,140 308,160 318,190 290,172 262,190 272,160 246,140 278,140" fill="#fff"/>
    <polygon points="300,240 308,260 330,260 312,272 318,294 300,281 282,294 288,272 270,260 292,260" fill="#fff"/>
    <polygon points="70,90 76,104 92,104 79,113 84,128 70,119 56,128 61,113 48,104 64,104" fill="#fff"/>
    <circle cx="180" cy="150" r="10" fill="#fff"/><circle cx="175" cy="250" r="14" fill="#fff"/>
  `);

  /* ===== البيت ===== */
  add('home', 'خيمة', `
    <path d="M40 330 L200 80 L360 330 Z" fill="#fff"/>
    <path d="M200 80 L150 330 L250 330 Z" fill="#fff"/>
    <path d="M200 80 L200 50 L235 62 L200 72" fill="#fff"/>
    <path d="M20 340 L380 340" fill="none"/>
  `);
  add('home', 'مسجد', `
    <path d="M90 200 L310 200 L310 350 L90 350 Z" fill="#fff"/>
    <path d="M120 200 Q120 110 200 90 Q280 110 280 200 Z" fill="#fff"/>
    <path d="M196 90 L196 60 L204 60 L204 90 Z" fill="#fff"/>
    <path d="M200 40 Q185 50 192 62 Q182 48 200 40 Z" fill="#fff"/>
    <path d="M30 120 L60 120 L60 350 L30 350 Z M340 120 L370 120 L370 350 L340 350 Z" fill="#fff"/>
    <path d="M30 120 L45 80 L60 120 Z M340 120 L355 80 L370 120 Z" fill="#fff"/>
    <path d="M170 350 L170 280 Q200 245 230 280 L230 350 Z" fill="#fff"/>
    <path d="M115 240 L145 240 L145 290 L115 290 Z M255 240 L285 240 L285 290 L255 290 Z" fill="#fff"/>
  `);
  add('home', 'منطاد', `
    <path d="M200 40 Q320 40 320 160 Q320 230 230 290 L170 290 Q80 230 80 160 Q80 40 200 40 Z" fill="#fff"/>
    <path d="M200 40 Q150 120 170 290 L230 290 Q250 120 200 40 Z" fill="#fff"/>
    <path d="M170 290 L165 320 M230 290 L235 320" fill="none"/>
    <path d="M160 320 L240 320 L232 370 L168 370 Z" fill="#fff"/>
  `);
})();
