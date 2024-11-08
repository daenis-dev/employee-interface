FROM nginx:latest

RUN mkdir -p /usr/share/nginx/html

COPY dist/employee-management-interface /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]