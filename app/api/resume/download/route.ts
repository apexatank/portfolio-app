import { NextRequest, NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Defensive data extraction
    const name = String(data.name || 'Professional Portfolio');
    const title = String(data.title || 'Creative Professional');
    const bio = String(data.bio || '');
    const skills = String(data.skills || '');
    const experience = Array.isArray(data.experience) ? data.experience : [];
    const projects = Array.isArray(data.projects) ? data.projects : [];
    const socials = data.socials || {};
    const theme = String(data.theme || 'blue');
    const template = String(data.template || 'modern');

    // Theme Colors
    const colors: Record<string, [number, number, number]> = {
      blue: [59, 130, 246],
      indigo: [79, 70, 229],
      violet: [124, 58, 237],
      emerald: [16, 185, 129],
      rose: [225, 29, 72],
      amber: [217, 119, 6]
    };

    const accent = colors[theme] || colors.blue;

    // Create jsPDF instance
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: false 
    });

    if (template === 'modern') {
      // --- MODERN PROFESSIONAL TEMPLATE ---
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.text(name, 20, 30);

      doc.setTextColor(71, 85, 105);
      doc.setFontSize(14);
      doc.text(title, 20, 38);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      const links = `${socials.linkedin || 'LinkedIn'}   |   ${socials.github || 'GitHub'}   |   Professional Resume`;
      doc.text(links, 20, 45);

      doc.setDrawColor(241, 245, 249);
      doc.line(20, 50, 190, 50);

      let y = 60;
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('PROFESSIONAL SUMMARY', 20, y);
      
      y += 7;
      doc.setTextColor(75, 85, 99);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const splitBio = doc.splitTextToSize(bio || 'No bio provided.', 170);
      doc.text(splitBio, 20, y);
      y += (splitBio.length * 5) + 10;

      const col1X = 20;
      const col2X = 135;
      const initialY = y;

      // Left Column: Experience
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('WORK EXPERIENCE', col1X, y);
      y += 8;

      if (experience.length === 0) {
        doc.setTextColor(148, 163, 184);
        doc.setFontSize(9);
        doc.text('No experience listed yet.', col1X, y);
        y += 10;
      } else {
        experience.forEach((exp: any) => {
          doc.setTextColor(17, 24, 39);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.text(String(exp.role || 'Role'), col1X, y);
          
          y += 5;
          doc.setTextColor(accent[0], accent[1], accent[2]);
          doc.setFontSize(9);
          doc.text(String(exp.company || 'Company'), col1X, y);
          
          doc.setTextColor(148, 163, 184);
          const periodWidth = doc.getTextWidth(String(exp.period || ''));
          doc.text(String(exp.period || ''), 120 - periodWidth, y);

          y += 5;
          doc.setTextColor(75, 85, 99);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          const splitDesc = doc.splitTextToSize(String(exp.desc || ''), 100);
          doc.text(splitDesc, col1X, y);
          y += (splitDesc.length * 4) + 8;
        });
      }

      y += 5;
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('KEY PROJECTS', col1X, y);
      y += 8;

      projects.slice(0, 3).forEach((p: any) => {
        doc.setTextColor(17, 24, 39);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text(String(p.title || 'Project'), col1X, y);
        
        y += 5;
        doc.setTextColor(75, 85, 99);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        const splitProj = doc.splitTextToSize(String(p.desc || ''), 100);
        doc.text(splitProj, col1X, y);
        y += (splitProj.length * 4) + 8;
      });

      // Right Column: Skills
      let y2 = initialY;
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('SKILLS', col2X, y2);
      y2 += 8;

      doc.setTextColor(75, 85, 99);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const skillsArray = skills.split(',').map((s: string) => s.trim()).filter(Boolean);
      skillsArray.forEach((skill: string) => {
        doc.text(`• ${skill}`, col2X, y2);
        y2 += 5;
      });

    } else {
      // --- CREATIVE GRID TEMPLATE (Centered) ---
      doc.setFillColor(248, 250, 252);
      doc.rect(0, 0, 210, 60, 'F');
      
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const label = "PORTFOLIO RESUME";
      const labelW = doc.getTextWidth(label);
      doc.text(label, (210 - labelW) / 2, 20);

      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(28);
      const nameW = doc.getTextWidth(name);
      doc.text(name, (210 - nameW) / 2, 32);

      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.setFontSize(14);
      const titleW = doc.getTextWidth(title);
      doc.text(title, (210 - titleW) / 2, 42);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(100, 116, 139);
      const foot = `${socials.linkedin || 'LinkedIn'}   |   ${socials.github || 'GitHub'}`;
      const footW = doc.getTextWidth(foot);
      doc.text(foot, (210 - footW) / 2, 50);

      let y = 75;
      doc.setDrawColor(accent[0], accent[1], accent[2]);
      doc.setLineWidth(1);
      doc.line(20, y, 40, y);
      
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('PERSONAL NARRATIVE', 45, y + 1.5);
      
      y += 10;
      doc.setTextColor(71, 85, 105);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      const splitBio = doc.splitTextToSize(bio || '', 170);
      doc.text(splitBio, 20, y);
      y += (splitBio.length * 6) + 15;

      const col1X = 20;
      const col2X = 125;
      const startY = y;

      // Work History (Col 1)
      doc.setDrawColor(accent[0], accent[1], accent[2]);
      doc.line(col1X, y, col1X + 20, y);
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('WORK HISTORY', col1X + 25, y + 1.5);
      
      y += 12;
      experience.forEach((exp: any) => {
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(String(exp.role || ''), col1X, y);
        
        doc.setTextColor(accent[0], accent[1], accent[2]);
        const per = String(exp.period || '');
        const perW = doc.getTextWidth(per);
        doc.text(per, 115 - perW, y);

        y += 5;
        doc.setTextColor(100, 116, 139);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text(String(exp.company || ''), col1X, y);

        y += 6;
        doc.setTextColor(71, 85, 105);
        doc.setFontSize(9);
        const splitE = doc.splitTextToSize(String(exp.desc || ''), 95);
        doc.text(splitE, col1X, y);
        y += (splitE.length * 4) + 10;
      });

      // Projects (Col 1)
      y += 5;
      doc.setDrawColor(accent[0], accent[1], accent[2]);
      doc.line(col1X, y, col1X + 20, y);
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('SELECTED WORKS', col1X + 25, y + 1.5);
      
      y += 12;
      projects.slice(0, 3).forEach((p: any) => {
        doc.setTextColor(15, 23, 42);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text(String(p.title || ''), col1X, y);
        
        y += 5;
        doc.setTextColor(100, 116, 139);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        const splitP = doc.splitTextToSize(String(p.desc || ''), 95);
        doc.text(splitP, col1X, y);
        y += (splitP.length * 4) + 8;
      });

      // Tech Stack (Col 2)
      let yc2 = startY;
      doc.line(col2X, yc2, col2X + 20, yc2);
      doc.setTextColor(accent[0], accent[1], accent[2]);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('CORE TECH', col2X + 25, yc2 + 1.5);
      
      yc2 += 12;
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const sArr = skills.split(',').map((s: string) => s.trim()).filter(Boolean);
      sArr.forEach((s: string) => {
        doc.text(`> ${s}`, col2X, yc2);
        yc2 += 6;
      });
    }

    // Output and return
    const pdfOutput = doc.output('arraybuffer');
    const buffer = Buffer.from(pdfOutput);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Resume-${name.replace(/\s+/g, '-')}.pdf"`
      }
    });

  } catch (error: any) {
    console.error('Final PDF Error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate PDF',
      details: error?.message || 'Unknown error'
    }, { status: 500 });
  }
}
