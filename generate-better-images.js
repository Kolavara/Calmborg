const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = 'public/images/products';

// Utility: metallic gradient
function metalGrad(ctx, x, y, w, h, lightness = 0.6) {
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  const l = lightness;
  g.addColorStop(0, `hsl(0, 0%, ${(l - 0.15) * 100}%)`);
  g.addColorStop(0.25, `hsl(0, 0%, ${(l + 0.1) * 100}%)`);
  g.addColorStop(0.5, `hsl(0, 0%, ${l * 100}%)`);
  g.addColorStop(0.75, `hsl(0, 0%, ${(l + 0.15) * 100}%)`);
  g.addColorStop(1, `hsl(0, 0%, ${(l - 0.1) * 100}%)`);
  return g;
}

// Utility: gold gradient for carbide inserts
function goldGrad(ctx, x, y, w, h) {
  const g = ctx.createLinearGradient(x, y, x + w, y + h);
  g.addColorStop(0, '#8B7500');
  g.addColorStop(0.2, '#D4A017');
  g.addColorStop(0.4, '#F0D060');
  g.addColorStop(0.6, '#C8960E');
  g.addColorStop(0.8, '#D4A017');
  g.addColorStop(1, '#8B7500');
  return g;
}

function drawBackground(ctx, w, h) {
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#f0f0f0');
  bg.addColorStop(0.5, '#e8e8e8');
  bg.addColorStop(1, '#dcdcdc');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  
  // Subtle grid pattern
  ctx.strokeStyle = 'rgba(0,0,0,0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

function drawShadow(ctx, x, y, w, h, blur = 20) {
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.15)';
  ctx.shadowBlur = blur;
  ctx.shadowOffsetX = 4;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = 'rgba(0,0,0,0.01)';
  ctx.fillRect(x, y, w, h);
  ctx.restore();
}

// ========================================
// 1. BALL NOSE INSERT - Realistic Gold Carbide
// ========================================
function createBallNoseInsert() {
  const W = 800, H = 800;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawBackground(ctx, W, H);

  function drawInsert(cx, cy, scale, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    const s = 100;

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, s * 0.6, s * 0.45, s * 0.06, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fill();

    // Ball nose body - rounded shape
    ctx.beginPath();
    ctx.moveTo(-s * 0.38, -s * 0.5);
    ctx.lineTo(s * 0.38, -s * 0.5);
    ctx.lineTo(s * 0.38, s * 0.05);
    ctx.arc(0, s * 0.05, s * 0.38, 0, Math.PI, false);
    ctx.closePath();

    // Gold gradient for carbide
    const gg = goldGrad(ctx, -s * 0.4, -s * 0.6, s * 0.8, s * 1.2);
    ctx.fillStyle = gg;
    ctx.fill();

    // Outline
    ctx.strokeStyle = '#7A6500';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Ball nose cutting edge highlight
    ctx.beginPath();
    ctx.arc(0, s * 0.05, s * 0.36, 0.15, Math.PI - 0.15, false);
    ctx.strokeStyle = 'rgba(255,255,200,0.7)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Center hole
    ctx.beginPath();
    ctx.arc(0, -s * 0.18, s * 0.1, 0, Math.PI * 2);
    ctx.fillStyle = '#666';
    ctx.fill();
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Inner chamfer ring
    ctx.beginPath();
    ctx.arc(0, -s * 0.18, s * 0.07, 0, Math.PI * 2);
    ctx.fillStyle = '#777';
    ctx.fill();

    // Chip breaker groove
    ctx.beginPath();
    ctx.arc(0, s * 0.15, s * 0.2, 0.3, Math.PI - 0.3, false);
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Brand text
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.font = `${s * 0.08}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText('CALM BORG', 0, s * 0.45);

    ctx.restore();
  }

  // Draw multiple inserts
  drawInsert(250, 280, 1.3, -0.15);
  drawInsert(500, 260, 1.4, 0.2);
  drawInsert(320, 500, 1.2, 0.05);
  drawInsert(560, 520, 1.15, -0.1);

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'ball_nose_insert.png'), buf);
  console.log('Created ball_nose_insert.png');
}

// ========================================
// 2. DRILLING INSERT - Realistic Carbide
// ========================================
function createDrillingInsert() {
  const W = 800, H = 800;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawBackground(ctx, W, H);

  function drawInsert(cx, cy, size, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(size / 100, size / 100);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, 55, 50, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fill();

    // Triangular insert shape
    ctx.beginPath();
    ctx.moveTo(0, -55);
    ctx.lineTo(50, 30);
    ctx.lineTo(-50, 30);
    ctx.closePath();

    const gg = goldGrad(ctx, -55, -60, 110, 100);
    ctx.fillStyle = gg;
    ctx.fill();
    ctx.strokeStyle = '#7A6500';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Cutting edge highlights
    ctx.beginPath();
    ctx.moveTo(0, -52);
    ctx.lineTo(47, 28);
    ctx.strokeStyle = 'rgba(255,255,200,0.5)';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -52);
    ctx.lineTo(-47, 28);
    ctx.strokeStyle = 'rgba(255,255,200,0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center hole
    ctx.beginPath();
    ctx.arc(0, 5, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#666';
    ctx.fill();
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Chip breaker grooves
    ctx.beginPath();
    ctx.moveTo(-20, 10);
    ctx.lineTo(20, 10);
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-15, 20);
    ctx.lineTo(15, 20);
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
  }

  drawInsert(280, 280, 130, 0);
  drawInsert(560, 310, 120, 0.4);
  drawInsert(350, 510, 125, -0.3);

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'drilling_insert.png'), buf);
  console.log('Created drilling_insert.png');
}

// ========================================
// 3. PULL STUD / RETENTION KNOB
// ========================================
function createPullStud() {
  const W = 800, H = 800;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawBackground(ctx, W, H);

  function drawStud(cx, cy, scale, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    const metalG = metalGrad(ctx, -25, -60, 50, 140);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, 85, 28, 6, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fill();

    // Pull stud head (rounded top)
    ctx.beginPath();
    ctx.ellipse(0, -50, 36, 14, 0, 0, Math.PI * 2);
    ctx.fillStyle = metalG;
    ctx.fill();
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Shaft body
    ctx.beginPath();
    ctx.roundRect(-14, -50, 28, 60, 3);
    ctx.fillStyle = metalG;
    ctx.fill();
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Thread section
    ctx.beginPath();
    ctx.roundRect(-12, 10, 24, 50, 2);
    ctx.fillStyle = '#c0c0c0';
    ctx.fill();
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Thread lines
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.moveTo(-12, 12 + i * 4);
      ctx.lineTo(12, 12 + i * 4);
      ctx.strokeStyle = i % 2 === 0 ? '#aaa' : '#999';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // Bottom tip
    ctx.beginPath();
    ctx.moveTo(-12, 60);
    ctx.lineTo(12, 60);
    ctx.lineTo(0, 72);
    ctx.closePath();
    ctx.fillStyle = metalG;
    ctx.fill();
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Highlight on shaft
    ctx.beginPath();
    ctx.roundRect(-4, -45, 8, 55, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fill();

    ctx.restore();
  }

  drawStud(250, 320, 2.2, -0.08);
  drawStud(450, 280, 2.8, 0.05);
  drawStud(580, 370, 2.0, 0.12);
  drawStud(350, 550, 1.8, -0.15);

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'pull_stud.png'), buf);
  console.log('Created pull_stud.png');
}

// ========================================
// 4. SETUP ACCESSORIES
// ========================================
function createSetupAccessories() {
  const W = 800, H = 800;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawBackground(ctx, W, H);

  function drawWrench(cx, cy, length, angle, thickness = 12) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    const mg = metalGrad(ctx, -thickness/2, -length/2, thickness, length);
    const mg2 = metalGrad(ctx, -thickness/2-8, -length/2-30, thickness+16, 35);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, length/2 + 8, length/4, 4, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fill();

    // Handle
    ctx.beginPath();
    ctx.roundRect(-thickness/2, -length/2, thickness, length, 4);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Wrench head
    const hw = thickness + 16;
    const hh = 30;
    ctx.beginPath();
    ctx.moveTo(-hw/2, -length/2);
    ctx.lineTo(-hw/2, -length/2 - hh);
    ctx.lineTo(-thickness/4, -length/2 - hh - 5);
    ctx.lineTo(-thickness/4, -length/2);
    ctx.closePath();
    ctx.fillStyle = mg2;
    ctx.fill();
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(hw/2, -length/2);
    ctx.lineTo(hw/2, -length/2 - hh);
    ctx.lineTo(thickness/4, -length/2 - hh - 5);
    ctx.lineTo(thickness/4, -length/2);
    ctx.closePath();
    ctx.fillStyle = mg2;
    ctx.fill();
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Highlight
    ctx.beginPath();
    ctx.roundRect(-2, -length/2 + 5, 4, length - 10, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fill();

    ctx.restore();
  }

  function drawSpanner(cx, cy, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    const mg = metalGrad(ctx, -8, -50, 16, 120);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, 70, 30, 5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fill();

    // Bar
    ctx.beginPath();
    ctx.roundRect(-8, -50, 16, 120, 4);
    ctx.fillStyle = '#333';
    ctx.fill();

    // Pins
    for (const px of [-35, 35]) {
      ctx.beginPath();
      ctx.arc(px, 0, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#c0c0c0';
      ctx.fill();
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Pin highlight
      ctx.beginPath();
      ctx.arc(px - 2, -2, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fill();
    }

    // Handle grip
    ctx.beginPath();
    ctx.roundRect(-12, 60, 24, 30, 5);
    ctx.fillStyle = '#444';
    ctx.fill();
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.restore();
  }

  function drawHexKey(cx, cy, size, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    const mg = metalGrad(ctx, -3, 0, 6, size);

    // L-shaped hex key
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -size * 0.7);
    ctx.lineTo(size * 0.6, -size * 0.7);
    ctx.lineTo(size * 0.6, -size * 0.7 + 8);
    ctx.lineTo(8, -size * 0.7 + 8);
    ctx.lineTo(8, 0);
    ctx.closePath();
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    ctx.restore();
  }

  drawWrench(250, 380, 200, -0.2);
  drawWrench(480, 350, 180, 0.15);
  drawSpanner(580, 480, 0.1);
  drawHexKey(280, 580, 120, -0.3);
  drawHexKey(440, 590, 100, 0.4);

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'setup_accessories.png'), buf);
  console.log('Created setup_accessories.png');
}

// ========================================
// 5. HYDRAULIC CHUCK (separate from milling chuck)
// ========================================
function createHydraulicChuck() {
  const W = 800, H = 800;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawBackground(ctx, W, H);

  function drawChuck(cx, cy, scale, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    const mg = metalGrad(ctx, -40, -120, 80, 240);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, 130, 55, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fill();

    // Taper shank (cone shape at top)
    ctx.beginPath();
    ctx.moveTo(-30, -110);
    ctx.lineTo(-42, -60);
    ctx.lineTo(42, -60);
    ctx.lineTo(30, -110);
    ctx.closePath();
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Main body
    ctx.beginPath();
    ctx.roundRect(-55, -60, 110, 120, 5);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Hydraulic chamber indicators (distinctive for hydraulic chucks)
    for (let i = 0; i < 4; i++) {
      const yy = -40 + i * 30;
      ctx.beginPath();
      ctx.arc(-40 + i * 25, yy, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,100,0.08)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,100,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Flange at bottom
    ctx.beginPath();
    ctx.roundRect(-58, 60, 116, 15, 3);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Collet nut section
    ctx.beginPath();
    ctx.roundRect(-52, 75, 104, 35, 3);
    ctx.fillStyle = metalGrad(ctx, -52, 75, 104, 35, 0.55);
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Knurling lines on collet nut
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(-50 + i * 14, 78);
      ctx.lineTo(-50 + i * 14, 108);
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // "HYDRAULIC" label
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('HYDRAULIC', 0, 5);

    // Highlight stripe
    ctx.beginPath();
    ctx.roundRect(-3, -55, 6, 110, 3);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fill();

    ctx.restore();
  }

  drawChuck(280, 350, 2.0, 0);
  drawChuck(530, 300, 2.3, 0.1);

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'hydraulic_chuck.png'), buf);
  console.log('Created hydraulic_chuck.png');
}

// ========================================
// 6. MILLING CHUCK (keep original style, enhance)
// ========================================
function createMillingChuck() {
  const W = 800, H = 800;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawBackground(ctx, W, H);

  function drawChuck(cx, cy, scale, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    const mg = metalGrad(ctx, -40, -120, 80, 240);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, 130, 55, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fill();

    // Taper shank
    ctx.beginPath();
    ctx.moveTo(-30, -110);
    ctx.lineTo(-42, -60);
    ctx.lineTo(42, -60);
    ctx.lineTo(30, -110);
    ctx.closePath();
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Main body
    ctx.beginPath();
    ctx.roundRect(-55, -60, 110, 120, 5);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Milling chuck distinctive: heavy duty grip indicators
    for (let i = 0; i < 3; i++) {
      const yy = -40 + i * 40;
      // Heavy collar lines
      ctx.beginPath();
      ctx.moveTo(-55, yy);
      ctx.lineTo(55, yy);
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Flange
    ctx.beginPath();
    ctx.roundRect(-58, 60, 116, 15, 3);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Collet nut section
    ctx.beginPath();
    ctx.roundRect(-52, 75, 104, 35, 3);
    ctx.fillStyle = metalGrad(ctx, -52, 75, 104, 35, 0.55);
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Knurling
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(-50 + i * 14, 78);
      ctx.lineTo(-50 + i * 14, 108);
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // "MILLING" label
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('MILLING', 0, 5);

    ctx.restore();
  }

  drawChuck(280, 350, 2.0, 0);
  drawChuck(530, 300, 2.3, 0.1);

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'milling_chuck.png'), buf);
  console.log('Created milling_chuck.png');
}

// ========================================
// 7. ER COLLET CHUCK (enhanced)
// ========================================
function createERColletChuck() {
  const W = 800, H = 800;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawBackground(ctx, W, H);

  function drawChuck(cx, cy, scale, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    const mg = metalGrad(ctx, -40, -120, 80, 240);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, 130, 55, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fill();

    // Taper shank
    ctx.beginPath();
    ctx.moveTo(-30, -110);
    ctx.lineTo(-42, -60);
    ctx.lineTo(42, -60);
    ctx.lineTo(30, -110);
    ctx.closePath();
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Main body (shorter)
    ctx.beginPath();
    ctx.roundRect(-55, -60, 110, 90, 5);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Flange
    ctx.beginPath();
    ctx.roundRect(-58, 30, 116, 15, 3);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Collet nut - larger, with hex pattern
    ctx.beginPath();
    ctx.roundRect(-56, 45, 112, 50, 5);
    ctx.fillStyle = metalGrad(ctx, -56, 45, 112, 50, 0.5);
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Hex nut pattern
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(-50 + i * 18, 48);
      ctx.lineTo(-50 + i * 18, 92);
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // "ER" label
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('ER', 0, -5);

    ctx.restore();
  }

  drawChuck(300, 340, 2.0, 0);
  drawChuck(530, 320, 2.2, 0.08);

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'er_collet_chuck.png'), buf);
  console.log('Created er_collet_chuck.png');
}

// ========================================
// 8. GROOVING TOOL (separate from grooving inserts)
// ========================================
function createGroovingTool() {
  const W = 800, H = 800;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawBackground(ctx, W, H);

  function drawTool(cx, cy, scale, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    const mg = metalGrad(ctx, -15, -80, 30, 160);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, 90, 40, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fill();

    // Tool shank
    ctx.beginPath();
    ctx.roundRect(-15, -80, 30, 150, 4);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Cutting head
    ctx.beginPath();
    ctx.moveTo(-18, -80);
    ctx.lineTo(-22, -100);
    ctx.lineTo(-5, -115);
    ctx.lineTo(5, -115);
    ctx.lineTo(22, -100);
    ctx.lineTo(18, -80);
    ctx.closePath();
    const headGrad = goldGrad(ctx, -25, -120, 50, 40);
    ctx.fillStyle = headGrad;
    ctx.fill();
    ctx.strokeStyle = '#7A6500';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Groove insert seat
    ctx.beginPath();
    ctx.rect(-10, -95, 20, 15);
    ctx.fillStyle = '#8B7500';
    ctx.fill();
    ctx.strokeStyle = '#6B5500';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Highlight
    ctx.beginPath();
    ctx.roundRect(-3, -75, 6, 140, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fill();

    ctx.restore();
  }

  drawTool(280, 350, 2.0, 0);
  drawTool(530, 320, 2.3, 0.1);

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'grooving_tool.png'), buf);
  console.log('Created grooving_tool.png');
}

// ========================================
// 9. THREADING TOOL (separate from threading inserts)
// ========================================
function createThreadingTool() {
  const W = 800, H = 800;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawBackground(ctx, W, H);

  function drawTool(cx, cy, scale, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    const mg = metalGrad(ctx, -15, -80, 30, 160);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, 90, 40, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fill();

    // Tool shank
    ctx.beginPath();
    ctx.roundRect(-15, -80, 30, 150, 4);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Cutting head (pointed for threading)
    ctx.beginPath();
    ctx.moveTo(-18, -80);
    ctx.lineTo(-20, -100);
    ctx.lineTo(0, -115);
    ctx.lineTo(20, -100);
    ctx.lineTo(18, -80);
    ctx.closePath();
    const headGrad = goldGrad(ctx, -22, -120, 44, 40);
    ctx.fillStyle = headGrad;
    ctx.fill();
    ctx.strokeStyle = '#7A6500';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Threading insert
    ctx.beginPath();
    ctx.moveTo(0, -95);
    ctx.lineTo(-8, -110);
    ctx.lineTo(8, -110);
    ctx.closePath();
    ctx.fillStyle = '#D4A017';
    ctx.fill();
    ctx.strokeStyle = '#8B7500';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Highlight
    ctx.beginPath();
    ctx.roundRect(-3, -75, 6, 140, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fill();

    ctx.restore();
  }

  drawTool(280, 350, 2.0, 0);
  drawTool(530, 320, 2.3, 0.1);

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'threading_tool.png'), buf);
  console.log('Created threading_tool.png');
}

// ========================================
// 10. CAT TOOL HOLDER (enhanced)
// ========================================
function createCatToolHolder() {
  const W = 800, H = 800;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawBackground(ctx, W, H);

  function drawHolder(cx, cy, scale, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    const mg = metalGrad(ctx, -40, -120, 80, 240);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, 130, 55, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fill();

    // CAT taper shank (steeper than BT)
    ctx.beginPath();
    ctx.moveTo(-28, -110);
    ctx.lineTo(-45, -50);
    ctx.lineTo(45, -50);
    ctx.lineTo(28, -110);
    ctx.closePath();
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Main body
    ctx.beginPath();
    ctx.roundRect(-55, -50, 110, 110, 5);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // V-groove (CAT specific)
    ctx.beginPath();
    ctx.moveTo(-55, -10);
    ctx.lineTo(55, -10);
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Flange with pull stud slot
    ctx.beginPath();
    ctx.roundRect(-58, 60, 116, 20, 3);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Collet nut
    ctx.beginPath();
    ctx.roundRect(-52, 80, 104, 40, 3);
    ctx.fillStyle = metalGrad(ctx, -52, 80, 104, 40, 0.55);
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Knurling
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(-50 + i * 11, 82);
      ctx.lineTo(-50 + i * 11, 118);
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    ctx.restore();
  }

  drawHolder(290, 330, 2.0, 0);
  drawHolder(530, 300, 2.2, 0.06);

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'cat_tool_holder.png'), buf);
  console.log('Created cat_tool_holder.png');
}

// ========================================
// 11. HSK HOLDER (enhanced)
// ========================================
function createHskHolder() {
  const W = 800, H = 800;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  drawBackground(ctx, W, H);

  function drawHolder(cx, cy, scale, angle) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    const mg = metalGrad(ctx, -40, -120, 80, 240);

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, 130, 55, 10, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fill();

    // HSK hollow taper (steeper)
    ctx.beginPath();
    ctx.moveTo(-30, -110);
    ctx.lineTo(-48, -45);
    ctx.lineTo(48, -45);
    ctx.lineTo(30, -110);
    ctx.closePath();
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Hollow shank indicator
    ctx.beginPath();
    ctx.arc(0, -100, 12, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fill();

    // Main body
    ctx.beginPath();
    ctx.roundRect(-55, -45, 110, 105, 5);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Flange
    ctx.beginPath();
    ctx.roundRect(-60, 60, 120, 18, 3);
    ctx.fillStyle = mg;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Collet nut
    ctx.beginPath();
    ctx.roundRect(-54, 78, 108, 42, 3);
    ctx.fillStyle = metalGrad(ctx, -54, 78, 108, 42, 0.55);
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.stroke();

    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(-52 + i * 11, 80);
      ctx.lineTo(-52 + i * 11, 118);
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    ctx.restore();
  }

  drawHolder(290, 330, 2.0, 0);
  drawHolder(530, 300, 2.2, 0.06);

  const buf = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(OUTPUT_DIR, 'hsk_holder.png'), buf);
  console.log('Created hsk_holder.png');
}

// ========================================
// RUN ALL
// ========================================
try {
  console.log('Generating enhanced product images...\n');
  
  createBallNoseInsert();
  createDrillingInsert();
  createPullStud();
  createSetupAccessories();
  createHydraulicChuck();
  createMillingChuck();
  createERColletChuck();
  createGroovingTool();
  createThreadingTool();
  createCatToolHolder();
  createHskHolder();
  
  console.log('\nAll enhanced images generated successfully!');
} catch(e) {
  console.error('Error:', e.message);
  console.log('If "canvas" package is not installed, run: npm install canvas');
}
