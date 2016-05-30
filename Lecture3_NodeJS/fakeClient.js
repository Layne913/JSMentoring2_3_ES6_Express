const paths = [
  '/coats',
  '/shirt',
  '/locks',
  '/dress',
];

for (let i = 0; i < 1000; i ++) {
  const req = http.request({
    hostname: 'localhost',
    port: 8080,
    path: paths[Math.floor(Math.random() * path.length)]
  });

  req.end();
}