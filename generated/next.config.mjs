/** @type {import('next').NextConfig} */

const publishName = process.env.EXAMPLE_PUBLISH_NAME
const publishBase = '/autocode-examples/examples/example-todo/' + publishName;

const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? publishBase : '',
};

export default nextConfig;
