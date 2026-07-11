const { createCanvas } = require('canvas');
const fs = require('fs');

// Ball Nose Insert Image
function createBallNoseInsertImage() {
  const canvas = createCanvas(800, 800);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 800, 800);
  bgGrad.addColorStop(0, '#f5f5f5');
  bgGrad.addColorStop(1, '#e8e8e8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 800, 800);

  // Draw ball nose inserts
  function drawInsert(x, y, size, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Gold gradient for insert
    const goldGrad = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2);
    goldGrad.addColorStop(0, '#d4a017');
    goldGrad.addColorStop(0.4, '#f0d060');
    goldGrad.addColorStop(0.7, '#c8960e');
    goldGrad.addColorStop(1, '#b8860b');

    // Main body - rounded ball nose shape
    ctx.beginPath();
    ctx.moveTo(-size * 0.4, -size * 0.5);
    ctx.lineTo(size * 0.4, -size * 0.5);
    ctx.lineTo(size * 0.4, size * 0.1);
    ctx.arc(0, size * 0.1, size * 0.4, 0, Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = goldGrad;
    ctx.fill();
    ctx.strokeStyle = '#8B7500';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center hole
    ctx.beginPath();
    ctx.arc(0, -size * 0.15, size * 0.1, 0, Math.PI * 2);
    ctx.fillStyle = '#666';
    ctx.fill();
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Cutting edge highlight
    ctx.beginPath();
    ctx.arc(0, size * 0.1, size * 0.38, 0.1, Math.PI - 0.1, false);
    ctx.strokeStyle = 'rgba(255,255,220,0.6)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, size * 0.55, size * 0.35, size * 0.05, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fill();

    ctx.restore();
  }

  // Draw 4 ball nose inserts at different angles
  drawInsert(250, 250, 120, -0.2);
  drawInsert(520, 300, 140, 0.15);
  drawInsert(300, 480, 130, 0.05);
  drawInsert(550, 520, 110, -0.1);

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('public/images/products/ball_nose_insert.png', buffer);
  console.log('Created ball_nose_insert.png');
}

// Pull Stud / Retention Knob Image
function createPullStudImage() {
  const canvas = createCanvas(800, 800);
  const ctx = canvas.getContext('2d');

  // Background
  const bgGrad = ctx.createLinearGradient(0, 0, 800, 800);
  bgGrad.addColorStop(0, '#f5f5f5');
  bgGrad.addColorStop(1, '#e8e8e8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 800, 800);

  function drawPullStud(x, y, scale, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    // Metal gradient
    const metalGrad = ctx.createLinearGradient(-20, 0, 20, 0);
    metalGrad.addColorStop(0, '#b0b0b0');
    metalGrad.addColorStop(0.3, '#e0e0e0');
    metalGrad.addColorStop(0.5, '#d0d0d0');
    metalGrad.addColorStop(0.7, '#e0e0e0');
    metalGrad.addColorStop(1, '#a0a0a0');

    // Knob head (wide part)
    ctx.beginPath();
    ctx.ellipse(0, -50, 35, 15, 0, 0, Math.PI * 2);
    ctx.fillStyle = metalGrad;
    ctx.fill();
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Neck
    ctx.beginPath();
    ctx.rect(-12, -50, 24, 60);
    ctx.fillStyle = metalGrad;
    ctx.fill();
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Thread section
    ctx.beginPath();
    ctx.rect(-10, 10, 20, 50);
    ctx.fillStyle = '#c0c0c0';
    ctx.fill();

    // Thread lines
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(-10, 15 + i * 5);
      ctx.lineTo(10, 15 + i * 5);
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Bottom tip
    ctx.beginPath();
    ctx.moveTo(-10, 60);
    ctx.lineTo(10, 60);
    ctx.lineTo(0, 75);
    ctx.closePath();
    ctx.fillStyle = metalGrad;
    ctx.fill();

    // Shadow
    ctx.beginPath();
    ctx.ellipse(0, 85, 25, 5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fill();

    ctx.restore();
  }

  // Draw several pull studs
  drawPullStud(200, 350, 2.0, -0.1);
  drawPullStud(400, 300, 2.5, 0.05);
  drawPullStud(580, 370, 1.8, 0.15);
  drawPullStud(300, 550, 1.6, -0.2);
  drawPullStud(500, 530, 2.2, 0.1);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('public/images/products/pull_stud.png', buffer);
  console.log('Created pull_stud.png');
}

// Drilling Insert Image
function createDrillingInsertImage() {
  const canvas = createCanvas(800, 800);
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createLinearGradient(0, 0, 800, 800);
  bgGrad.addColorStop(0, '#f5f5f5');
  bgGrad.addColorStop(1, '#e8e8e8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 800, 800);

  function drawDrillingInsert(x, y, size, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Drilling inserts are typically triangular or rhombic with a wiper edge
    const goldGrad = ctx.createLinearGradient(-size/2, -size/2, size/2, size/2);
    goldGrad.addColorStop(0, '#c8c8c8');
    goldGrad.addColorStop(0.3, '#e8e8e8');
    goldGrad.addColorStop(0.6, '#d0d0d0');
    goldGrad.addColorStop(1, '#a8a8a8');

    // Triangular drilling insert shape
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.5);
    ctx.lineTo(size * 0.45, size * 0.35);
    ctx.lineTo(-size * 0.45, size * 0.35);
    ctx.closePath();
    ctx.fillStyle = goldGrad;
    ctx.fill();
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Center hole
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = '#555';
    ctx.fill();

    // Chip breaker groove
    ctx.beginPath();
    ctx.moveTo(-size * 0.2, size * 0.1);
    ctx.quadraticCurveTo(0, -size * 0.15, size * 0.2, size * 0.1);
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }

  drawDrillingInsert(250, 280, 140, 0);
  drawDrillingInsert(500, 250, 120, 0.5);
  drawDrillingInsert(350, 480, 130, -0.3);
  drawDrillingInsert(560, 500, 110, 0.8);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('public/images/products/drilling_insert.png', buffer);
  console.log('Created drilling_insert.png');
}

// Setup Accessories Image
function createSetupAccessoriesImage() {
  const canvas = createCanvas(800, 800);
  const ctx = canvas.getContext('2d');

  const bgGrad = ctx.createLinearGradient(0, 0, 800, 800);
  bgGrad.addColorStop(0, '#f5f5f5');
  bgGrad.addColorStop(1, '#e8e8e8');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 800, 800);

  // Draw a wrench
  function drawWrench(x, y, length, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    const metalGrad = ctx.createLinearGradient(-5, 0, 5, 0);
    metalGrad.addColorStop(0, '#a0a0a0');
    metalGrad.addColorStop(0.5, '#d0d0d0');
    metalGrad.addColorStop(1, '#909090');

    // Handle
    ctx.beginPath();
    ctx.roundRect(-8, -length/2, 16, length, 4);
    ctx.fillStyle = metalGrad;
    ctx.fill();
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Open end
    ctx.beginPath();
    ctx.moveTo(-15, -length/2);
    ctx.lineTo(-15, -length/2 - 25);
    ctx.lineTo(-5, -length/2 - 30);
    ctx.lineTo(-5, -length/2);
    ctx.fillStyle = metalGrad;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(15, -length/2);
    ctx.lineTo(15, -length/2 - 25);
    ctx.lineTo(5, -length/2 - 30);
    ctx.lineTo(5, -length/2);
    ctx.fillStyle = metalGrad;
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }

  // Draw a collet spanner
  function drawSpanner(x, y, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.rect(-60, -8, 120, 16);
    ctx.fillStyle = '#333';
    ctx.fill();

    // Pins
    ctx.beginPath();
    ctx.arc(-40, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#c0c0c0';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(40, 0, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#c0c0c0';
    ctx.fill();

    // Handle
    ctx.beginPath();
    ctx.roundRect(-10, 5, 20, 100, 5);
    ctx.fillStyle = '#444';
    ctx.fill();

    ctx.restore();
  }

  drawWrench(250, 400, 200, -0.3);
  drawWrench(450, 350, 180, 0.1);
  drawSpanner(550, 500, 0.2);

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync('public/images/products/setup_accessories.png', buffer);
  console.log('Created setup_accessories.png');
}

try {
  createBallNoseInsertImage();
  createPullStudImage();
  createDrillingInsertImage();
  createSetupAccessoriesImage();
  console.log('\nAll images generated successfully!');
} catch(e) {
  console.error('Error:', e.message);
  console.log('The "canvas" package may not be installed. Install with: npm install canvas');
}
