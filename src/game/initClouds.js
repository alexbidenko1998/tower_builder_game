import gsap from "gsap";

export default (s) => {
  const cloud = s.group(
    s.circle(180, 100, 50), s.circle(240, 100, 50),
    s.circle(150, 150, 50), s.circle(210, 150, 50), s.circle(270, 150, 50)
  );
  cloud.attr('fill', "white").attr('id', "cloud_1");

  const y = Math.round(Math.random() * 60) + 10;
  gsap.fromTo("#cloud_1", {x: -400, y}, {duration: 20, x: window.innerWidth, y});

  setInterval(() => {
    const y = Math.round(Math.random() * 60) + 10;
    gsap.fromTo("#cloud_1", {x: -400, y}, {duration: 20, x: window.innerWidth, y});
  }, 20000);

  setTimeout(() => {
    cloud.after(cloud.clone().attr('id', "cloud_2"));
    const y = Math.round(Math.random() * 60) + 10;
    gsap.fromTo("#cloud_2", {x: -400, y}, {duration: 20, x: window.innerWidth, y});

    setInterval(() => {
      const y = Math.round(Math.random() * 60) + 10;
      gsap.fromTo("#cloud_2", {x: -400, y}, {duration: 20, x: window.innerWidth, y});
    }, 20000);
  }, 10000);
};
