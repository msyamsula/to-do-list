
FROM nginx:latest

# copy build folder after npm run build to nginx
COPY ./build /usr/share/nginx/html 

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]