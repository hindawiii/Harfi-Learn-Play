/**
 * مكتبة رسومات التلوين - حرفي
 * رسومات أصلية متعددة الأجزاء (viewBox 0 0 400 400)
 * كل جزء قابل للتلوين بلون مستقل.
 */
(function () {
  const S = [];
  const add = (cat, name, svg) => S.push({ cat, name, svg });

  /* ================= حيوانات ================= */
  add('animal', 'سمكة', `
    <ellipse cx="185" cy="205" rx="118" ry="72" fill="#fff"/>
    <path d="M290 205 Q345 150 372 130 Q362 205 372 280 Q345 260 290 205 Z" fill="#fff"/>
    <path d="M170 133 Q200 100 235 140 Q205 150 170 133 Z" fill="#fff"/>
    <path d="M170 277 Q200 310 235 270 Q205 260 170 277 Z" fill="#fff"/>
    <path d="M120 140 Q95 205 120 270 Q160 205 120 140 Z" fill="#fff"/>
    <circle cx="118" cy="185" r="16" fill="#fff"/>
    <circle cx="118" cy="185" r="6" fill="#2D3436" stroke="none"/>
    <path d="M96 225 Q118 243 146 230" fill="none"/>
    <circle cx="205" cy="175" r="16" fill="#fff"/>
    <circle cx="245" cy="215" r="16" fill="#fff"/>
    <circle cx="205" cy="248" r="16" fill="#fff"/>
  `);

  add('animal', 'قطة', `
    <path d="M112 165 Q104 92 132 78 Q160 96 176 130 Z" fill="#fff"/>
    <path d="M288 165 Q296 92 268 78 Q240 96 224 130 Z" fill="#fff"/>
    <ellipse cx="200" cy="205" rx="98" ry="90" fill="#fff"/>
    <ellipse cx="200" cy="322" rx="74" ry="52" fill="#fff"/>
    <circle cx="168" cy="192" r="14" fill="#fff"/>
    <circle cx="232" cy="192" r="14" fill="#fff"/>
    <path d="M186 226 L214 226 L200 242 Z" fill="#fff"/>
    <path d="M200 242 Q182 262 162 250 M200 242 Q218 262 238 250" fill="none"/>
    <path d="M96 214 L150 220 M96 240 L150 236 M304 214 L250 220 M304 240 L250 236" fill="none"/>
  `);

  add('animal', 'أرنب', `
    <ellipse cx="158" cy="120" rx="26" ry="72" fill="#fff"/>
    <ellipse cx="242" cy="120" rx="26" ry="72" fill="#fff"/>
    <ellipse cx="158" cy="122" rx="12" ry="52" fill="#fff"/>
    <ellipse cx="242" cy="122" rx="12" ry="52" fill="#fff"/>
    <circle cx="200" cy="228" r="82" fill="#fff"/>
    <ellipse cx="200" cy="330" rx="66" ry="44" fill="#fff"/>
    <circle cx="174" cy="215" r="11" fill="#fff"/>
    <circle cx="226" cy="215" r="11" fill="#fff"/>
    <ellipse cx="200" cy="246" rx="14" ry="10" fill="#fff"/>
    <path d="M200 256 Q186 274 170 266 M200 256 Q214 274 230 266" fill="none"/>
  `);

  add('animal', 'فراشة', `
    <path d="M196 120 Q118 62 88 128 Q64 190 150 208 Q192 196 196 150 Z" fill="#fff"/>
    <path d="M204 120 Q282 62 312 128 Q336 190 250 208 Q208 196 204 150 Z" fill="#fff"/>
    <path d="M196 218 Q130 236 132 300 Q140 344 196 300 Z" fill="#fff"/>
    <path d="M204 218 Q270 236 268 300 Q260 344 204 300 Z" fill="#fff"/>
    <ellipse cx="200" cy="212" rx="14" ry="86" fill="#fff"/>
    <circle cx="200" cy="118" r="18" fill="#fff"/>
    <path d="M190 104 Q170 70 146 62 M210 104 Q230 70 254 62" fill="none"/>
    <circle cx="130" cy="140" r="17" fill="#fff"/>
    <circle cx="270" cy="140" r="17" fill="#fff"/>
    <circle cx="168" cy="276" r="13" fill="#fff"/>
    <circle cx="232" cy="276" r="13" fill="#fff"/>
  `);

  add('animal', 'طائر', `
    <ellipse cx="196" cy="228" rx="96" ry="76" fill="#fff"/>
    <circle cx="128" cy="150" r="52" fill="#fff"/>
    <path d="M82 146 L34 160 L82 176 Z" fill="#fff"/>
    <circle cx="116" cy="140" r="10" fill="#fff"/>
    <path d="M210 200 Q276 186 300 246 Q262 288 210 262 Z" fill="#fff"/>
    <path d="M286 240 Q346 218 372 262 Q332 282 288 272 Z" fill="#fff"/>
    <path d="M164 300 L156 350 M228 300 L236 350" fill="none"/>
  `);

  /* ================= طبيعة ================= */
  add('nature', 'شمس', `
    <circle cx="200" cy="200" r="88" fill="#fff"/>
    <circle cx="200" cy="200" r="56" fill="#fff"/>
    <circle cx="178" cy="188" r="8" fill="#fff"/>
    <circle cx="222" cy="188" r="8" fill="#fff"/>
    <path d="M176 218 Q200 240 224 218" fill="none"/>
    <g fill="#fff">
      <path d="M200 96 L184 42 L216 42 Z"/>
      <path d="M200 304 L184 358 L216 358 Z"/>
      <path d="M96 200 L42 184 L42 216 Z"/>
      <path d="M304 200 L358 184 L358 216 Z"/>
      <path d="M128 128 L86 84 L108 68 Z"/>
      <path d="M272 128 L314 84 L292 68 Z"/>
      <path d="M128 272 L86 316 L108 332 Z"/>
      <path d="M272 272 L314 316 L292 332 Z"/>
    </g>
  `);

  add('nature', 'شجرة', `
    <path d="M182 250 L182 356 L218 356 L218 250 Z" fill="#fff"/>
    <path d="M182 296 Q140 276 122 246" fill="none"/>
    <path d="M218 286 Q262 268 282 240" fill="none"/>
    <circle cx="200" cy="150" r="72" fill="#fff"/>
    <circle cx="132" cy="196" r="54" fill="#fff"/>
    <circle cx="268" cy="196" r="54" fill="#fff"/>
    <circle cx="200" cy="222" r="52" fill="#fff"/>
    <ellipse cx="200" cy="366" rx="120" ry="16" fill="#fff"/>
    <circle cx="160" cy="170" r="12" fill="#fff"/>
    <circle cx="246" cy="204" r="12" fill="#fff"/>
  `);

  add('nature', 'وردة', `
    <path d="M192 214 L192 352 L208 352 L208 214 Z" fill="#fff"/>
    <path d="M192 268 Q136 250 116 210 Q176 202 192 250 Z" fill="#fff"/>
    <path d="M208 312 Q264 296 286 258 Q226 248 208 296 Z" fill="#fff"/>
    <path d="M200 74 Q142 92 148 148 Q104 176 132 220 Q160 258 200 240 Q240 258 268 220 Q296 176 252 148 Q258 92 200 74 Z" fill="#fff"/>
    <circle cx="200" cy="168" r="52" fill="#fff"/>
    <circle cx="200" cy="168" r="26" fill="#fff"/>
  `);

  add('nature', 'سحابة ومطر', `
    <path d="M126 224 Q80 224 80 184 Q80 144 126 146 Q140 96 200 96 Q258 96 272 146 Q322 144 322 188 Q322 224 280 224 Z" fill="#fff"/>
    <path d="M138 258 L124 300 M186 258 L172 306 M234 258 L220 300 M282 258 L268 306" fill="none"/>
    <path d="M150 324 Q160 344 150 352 Q136 348 140 332 Z" fill="#fff"/>
    <path d="M250 324 Q260 344 250 352 Q236 348 240 332 Z" fill="#fff"/>
  `);

  add('nature', 'جبل ونهر', `
    <path d="M40 320 L146 140 L212 250 L262 176 L360 320 Z" fill="#fff"/>
    <path d="M120 186 L146 140 L174 186 Q146 202 120 186 Z" fill="#fff"/>
    <path d="M240 210 L262 176 L286 212 Q262 226 240 210 Z" fill="#fff"/>
    <path d="M40 320 Q120 300 200 320 Q280 340 360 320 L360 366 L40 366 Z" fill="#fff"/>
    <circle cx="308" cy="98" r="34" fill="#fff"/>
  `);

  /* ================= أشياء ================= */
  add('object', 'بيت', `
    <path d="M104 202 L104 356 L296 356 L296 202 Z" fill="#fff"/>
    <path d="M70 208 L200 88 L330 208 Z" fill="#fff"/>
    <path d="M176 264 L176 356 L232 356 L232 264 Z" fill="#fff"/>
    <circle cx="222" cy="312" r="6" fill="#fff"/>
    <path d="M122 232 L166 232 L166 276 L122 276 Z" fill="#fff"/>
    <path d="M240 232 L280 232 L280 276 L240 276 Z" fill="#fff"/>
    <path d="M252 130 L252 92 L282 92 L282 158 Z" fill="#fff"/>
    <ellipse cx="200" cy="362" rx="140" ry="12" fill="#fff"/>
  `);

  add('object', 'سيارة', `
    <path d="M64 216 L336 216 L336 288 L64 288 Z" fill="#fff"/>
    <path d="M112 216 L146 146 L256 146 L292 216 Z" fill="#fff"/>
    <path d="M150 210 L172 158 L196 158 L196 210 Z" fill="#fff"/>
    <path d="M250 210 L228 158 L204 158 L204 210 Z" fill="#fff"/>
    <circle cx="130" cy="296" r="38" fill="#fff"/>
    <circle cx="130" cy="296" r="16" fill="#fff"/>
    <circle cx="272" cy="296" r="38" fill="#fff"/>
    <circle cx="272" cy="296" r="16" fill="#fff"/>
    <circle cx="86" cy="240" r="12" fill="#fff"/>
    <circle cx="318" cy="240" r="12" fill="#fff"/>
  `);

  add('object', 'قارب', `
    <path d="M64 272 L336 272 L292 340 L108 340 Z" fill="#fff"/>
    <path d="M196 60 L196 264 L212 264 L212 60 Z" fill="#fff"/>
    <path d="M188 84 L72 250 L188 250 Z" fill="#fff"/>
    <path d="M220 110 L318 250 L220 250 Z" fill="#fff"/>
    <path d="M40 356 Q90 336 140 356 Q190 376 240 356 Q290 336 360 356" fill="none"/>
  `);

  add('object', 'قلب', `
    <path d="M200 348 L96 226 Q52 172 106 128 Q158 92 200 156 Q242 92 294 128 Q348 172 304 226 Z" fill="#fff"/>
    <path d="M200 300 L134 224 Q108 190 140 166 Q174 146 200 190 Q226 146 260 166 Q292 190 266 224 Z" fill="#fff"/>
    <circle cx="146" cy="164" r="12" fill="#fff"/>
  `);

  add('object', 'نجمة', `
    <polygon points="200,54 244,166 364,166 268,236 304,352 200,282 96,352 132,236 36,166 156,166" fill="#fff"/>
    <polygon points="200,124 222,182 284,182 234,218 252,278 200,242 148,278 166,218 116,182 178,182" fill="#fff"/>
  `);

  add('object', 'كتاب', `
    <path d="M64 116 L196 140 L196 344 L64 320 Z" fill="#fff"/>
    <path d="M336 116 L204 140 L204 344 L336 320 Z" fill="#fff"/>
    <path d="M196 140 L196 344 L204 344 L204 140 Z" fill="#fff"/>
    <path d="M92 172 L168 186 M92 210 L168 224 M92 248 L168 262" fill="none"/>
    <path d="M308 172 L232 186 M308 210 L232 224 M308 248 L232 262" fill="none"/>
  `);

  /* ================= طعام ================= */
  add('food', 'تفاحة', `
    <path d="M200 130 Q140 96 106 152 Q76 210 122 288 Q160 348 200 314 Q240 348 278 288 Q324 210 294 152 Q260 96 200 130 Z" fill="#fff"/>
    <path d="M196 128 L196 76 L208 76 L208 128 Z" fill="#fff"/>
    <path d="M208 96 Q262 62 288 92 Q252 130 208 116 Z" fill="#fff"/>
    <path d="M150 176 Q138 210 152 246" fill="none"/>
  `);

  add('food', 'كوب عصير', `
    <path d="M128 128 L272 128 L250 342 L150 342 Z" fill="#fff"/>
    <path d="M136 186 L264 186 L250 342 L150 342 Z" fill="#fff"/>
    <path d="M240 116 L296 46 L312 56 L256 126 Z" fill="#fff"/>
    <ellipse cx="200" cy="128" rx="72" ry="18" fill="#fff"/>
    <circle cx="176" cy="240" r="14" fill="#fff"/>
    <circle cx="222" cy="284" r="12" fill="#fff"/>
  `);

  add('food', 'كعكة', `
    <path d="M96 208 L304 208 L288 336 L112 336 Z" fill="#fff"/>
    <path d="M96 208 Q112 160 148 178 Q178 138 200 178 Q226 138 254 178 Q290 158 304 208 Z" fill="#fff"/>
    <path d="M194 108 L194 158 L206 158 L206 108 Z" fill="#fff"/>
    <path d="M200 108 Q186 88 200 62 Q216 88 200 108 Z" fill="#fff"/>
    <path d="M120 260 L280 260" fill="none"/>
    <circle cx="150" cy="298" r="10" fill="#fff"/>
    <circle cx="200" cy="298" r="10" fill="#fff"/>
    <circle cx="250" cy="298" r="10" fill="#fff"/>
  `);

  window.HARFI_SHAPES = S;

  /**
   * حروف وأرقام متعددة الأجزاء:
   * إطار + خلفية + الحرف مقسوم إلى ثلاث شرائح قابلة للتلوين + نجوم زينة.
   */
  window.harfiGlyphSvg = function (ch, fontSize) {
    const id = 'clip-' + Math.random().toString(36).slice(2, 9);
    return `
      <defs>
        <clipPath id="${id}">
          <text x="200" y="205" dominant-baseline="central" text-anchor="middle"
                font-family="Tajawal, Arial, sans-serif" font-weight="900" font-size="${fontSize}">${ch}</text>
        </clipPath>
      </defs>
      <rect x="26" y="26" width="348" height="348" rx="40" fill="#fff"/>
      <rect x="52" y="52" width="296" height="296" rx="28" fill="#fff"/>
      <g clip-path="url(#${id})" stroke="none">
        <rect x="20" y="20" width="360" height="120" fill="#fff"/>
        <rect x="20" y="140" width="360" height="120" fill="#fff"/>
        <rect x="20" y="260" width="360" height="130" fill="#fff"/>
      </g>
      <text x="200" y="205" dominant-baseline="central" text-anchor="middle"
            font-family="Tajawal, Arial, sans-serif" font-weight="900" font-size="${fontSize}"
            fill="none" stroke="#2D3436" stroke-width="4" pointer-events="none">${ch}</text>
      <circle cx="72" cy="72" r="12" fill="#fff"/>
      <circle cx="328" cy="72" r="12" fill="#fff"/>
      <circle cx="72" cy="328" r="12" fill="#fff"/>
      <circle cx="328" cy="328" r="12" fill="#fff"/>
    `;
  };
})();
