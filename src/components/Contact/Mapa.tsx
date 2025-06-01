const Mapa = () => {
  return (
    <iframe
      title="Mapa"
      className="w-full h-64 rounded-xl"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.6794063542127!2d-80.62431992517048!3d-5.189365352182343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9032d5872f04f0b9%3A0x2ef0d507169f8a2a!2sAv.%20Los%20Girasoles%2C%20Piura%2020010!5e0!3m2!1ses!2spe!4v1717171717171!5m2!1ses!2spe"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default Mapa;
