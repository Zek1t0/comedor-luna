// whatsapp-button.tsx  (o WhatsappButton.tsx)
export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5493644636144"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="
        fixed bottom-5 right-5 z-50
        w-14 h-14 rounded-full grid place-items-center
        bg-[#25D366] shadow-[0_12px_28px_rgba(0,0,0,0.18)]
        transition-transform hover:scale-105 active:scale-95
        floating
      "
    >
      {/* Burbuja con trazo blanco, sin fill (como el botón blanco) */}
      <svg
        viewBox="-0.5 0 24 24"
        width="22"
        height="60"
        aria-hidden="true"
        className="pointer-events-none w-7"
      >
        <g transform="scale(1,1.1)">
        <path
          d="M21 10c0 4.418-4.03 8-9 8-1.27 0-2.5-.22-3.6-.62L3 19l1.33-4.03A7.9 7.9 0 0 1 3 10c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          />
          </g>
      </svg>
    </a>
  );
}
