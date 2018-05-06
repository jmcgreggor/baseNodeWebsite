# HOW TO GUIDE FOR DEPLOYING IN THE CLOUD (DRAFT)

1. Deployed single node from DockerCloud
    * webnode-ubuntu-64x-1001
    * 159.203.82.237
    * 1d0569e4-43a4-41fd-9cb8-c79337bc5881.node.dockerapp.io
    * 1 GB Memory / 30 GB Disk / NYC3 - Ubuntu 14.04.5 x64
2. Reset root password from Digital Ocean
3. Verify Ubuntu version: lsb_release -a
4. Enable ssh login using password: vim /etc/ssh/sshd_config
5. Restart ssh service: service ssh restart
6. Create non-root user: user add james
7. Add new user to needed groups (ssh, admin, docker): usermod -aG <group> james
8. Check docker version (API version 1.23): docker version
    * Note: docker-engine is installed not docker-ce so some commands are different
    * Note: with ubuntu 14.x use the existing docker installation; 
    * Note: if you upgrade to a version > 16.x you may need to install docker-ce (test first)
9. Enable firewall ports (22, 22/tcp, 2375, 2375/tcp, 6783/tcp, 6783/udp): ufw allow <port>/<protocol>
10. Enable firewall: ufw enable
11. Check firewall status: ufw status
12. Update apt repo: apt-get update
13. Install systemd (includes systemctl): apt-get install systemd
14. Install Nginx: apt-get install nginx
15. Check installation of Nginx: ufw app list
    * You should see
        * Nginx Full
        * Nginx HTTP
        * Nginx HTTPS
        * OpenSSH
16. Add Nginx to firewall rules: ufw allow ’Nginx HTTP’
17. Reload firewall: ufw reload
18. Check firewall rules: ufw status
19. Check to see that Nginx is running. Go to the IP address in your browser, you should receive a welcome message from Nginx.
20. SSH into the node: ssh <account>@<hostip>
21. Second verification of Nginx: ip addr show eth0 | grep inet | awk '{ print $2; }' | sed 's/\/.*$//'
    * You should receive 2-3 lines showing IP addresses of the host
22. Take a snapshot of the installation from Digital Ocean but first gracefully shutdown the server: sudo shutdown -h now (or from the console, just shutdown -h now)
23. Deploy service from Docker Cloud to node on Digital Ocean
    * Do not publish port 8080
24. Verify port is not published by going to port 8080 of the IP address - request should fail or time out.
25. Make a copy of the Nginx config: sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak
26. Edit Nginx config to pass traffic to 8080 on node: sudo vi /etc/nginx/sites-available/default
    1. Add the following to the server block:
        -     location / {
        -         proxy_pass http://localhost:8080;
        -         proxy_http_version 1.1;
        -         proxy_set_header Upgrade $http_upgrade;
        -         proxy_set_header Connection 'upgrade';
        -         proxy_set_header Host $host;
        -         proxy_cache_bypass $http_upgrade;
        -     }
        - }
27. Test that no syntax errors exist with the file: sudo nginx -t
28. Restart Nginx: service nginx restart
29. Check to see what ports are listening: netstat -lntu

