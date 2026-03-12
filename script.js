/**
 * SHARK Landing Page — Form handling & Telegram integration
 */

(function () {
  'use strict';

  const FORM_ID = 'shark-form';
  const TELEGRAM_USER = 'm_teem1';
  const TELEGRAM_BASE = `https://t.me/${TELEGRAM_USER}`;

  const form = document.getElementById(FORM_ID);
  if (!form) return;

  /**
   * Build a clean, readable message from form data (Arabic labels)
   */
  function buildMessage(data) {
    const lines = [
      '🦈 *SHARK — طلب جديد*',
      '',
      `*الاسم الكامل:* ${data.fullName}`,
      `*العمر:* ${data.age}`,
      `*الوزن:* ${data.weight} كغ`,
      `*الطول:* ${data.height} سم`,
      data.healthStatus ? `*الحالة الصحية:* ${data.healthStatus}` : null,
      data.currentMedications ? `*الأدوية الحالية:* ${data.currentMedications}` : null,
      `*هدفك من البدء:* ${data.goal}`,
      `*اسم المنتج المستخدم:* ${data.productName}`,
    ].filter(Boolean);
    return lines.join('\n');
  }

  /**
   * Collect form values into an object
   */
  function collectFormData() {
    const fd = new FormData(form);
    return {
      fullName: (fd.get('fullName') || '').trim(),
      age: fd.get('age') || '',
      weight: fd.get('weight') || '',
      height: fd.get('height') || '',
      healthStatus: (fd.get('healthStatus') || '').trim(),
      currentMedications: (fd.get('currentMedications') || '').trim(),
      goal: (fd.get('goal') || '').trim(),
      productName: (fd.get('productName') || '').trim(),
    };
  }

  /**
   * Redirect to Telegram with pre-filled message
   */
  function redirectToTelegram(message) {
    const encoded = encodeURIComponent(message);
    const url = `${TELEGRAM_BASE}?text=${encoded}`;
    window.location.href = url;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = collectFormData();
    const message = buildMessage(data);

    // Optional: brief feedback before redirect
    const btn = document.getElementById('btnDone');
    if (btn) {
      btn.disabled = true;
      btn.querySelector('.btn-text').textContent = 'جاري الإرسال...';
    }

    redirectToTelegram(message);
  });

  // YouTube background is in iframe; autoplay with mute is in embed URL
})();
