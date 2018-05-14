# HOW TO GUIDE FOR BUILDING OUT THE ENVIRONMENT

1.	Deployed single droplet from Digital Ocean
2.	Create RSA key and added to new droplet
a.	ssh-keygen -t rsa
b.	Added PW to key
c.	cat ~/.ssh/id_rsa.pub
3.	Reset root password using passwd
4.	Verify Ubuntu version: lsb_release -a
5.	Enable ssh login using password: vim /etc/ssh/sshd_config
6.	Restart ssh service: service ssh restart
7.	Create non-root user
8.	Installed docker-ce.
a.	See https://docs.docker.com/install/linux/docker-ce/ubuntu/#upgrade-docker-ce
9.	Create non-root user:
10.	Add new user to needed groups (ssh, admin, docker): usermod -aG <group> <user.
11.	Check docker version: docker version
a.	Version: 18.03.1-ce
b.	API version:  1.37
12.	Skipped system install, already installed (apt-get install systemd)
13.	Install Nginx: apt-get install nginx
14.	15. Check installation of Nginx: ufw app list
* You should see
* Nginx Full
* Nginx HTTP
* Nginx HTTPS
* OpenSSH
15.	Enable firewall: ufw enable
16.	Check firewall status: ufw status
17.	Enable firewall ports for ssh  
18.	Add Nginx to firewall rules: ufw allow ’Nginx HTTP’
19.	Reload the firewall: ufw reload
20.	Check firewall rules: ufw status
21.	Check to see that Nginx is running. Go to the IP address in your browser or by using curl, you should receive a welcome message from Nginx.
22.	Test: curl <IP address>
23.	Second verification of Nginx: ip addr show eth0 | grep inet | awk '{ print $2; }' | sed 's/\/.\*$//'
* Remove the slash before the asterisk and the dollar sign from the script above \*$//, it is only there to escape the asterisk
* You should receive 2-3 lines showing IP addresses of the host
24.	Take a snapshot of the installation from Digital Ocean but first gracefully shutdown the server: sudo shutdown -h now (or from the console, just shutdown -h now)
25.	Pushed latest build to git-hub/synced with docker cloud
26.	Created new build of image: docker build -t <image name> .
27.	Tagged the image: docker tag image username/repository:tag
28.	Pushed the image to docker hub: docker push username/repository:tag
29.	ssh’d to new server
30.	Pulled latest docker build from docker hub: docker pull username/repository:tag
31.	Made sure image has been downloaded: docker image ls -a
32.	Make a copy of the Nginx config: cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak
33.	Edit Nginx config to pass traffic from 80 to 8080 on in container: sudo vi /etc/nginx/sites-available/default
a.	Add the following to the server block:
		server {
      			listen 80;
       				location / {
                				proxy_set_header X-Real-IP $remote_addr;
                				proxy_pass http://localhost:8080;
        			}
34.	Test that no syntax errors exist with the file: sudo nginx -t
35.	Restart Nginx: systemctl reload nginx
36.	Check to see what ports are listening: netstat -lntu
37.	Run a container: docker run -p 127.0.0.1:8080:8080 username/repository:tag
a.	You must specify the localhost IP otherwise Docker will expose the port externally!
38.	For the process to work correctly (when restarting), be sure to restart in the following order…
a.	Firewall
b.	Nginx
c.	Docker
39.	Updated floating IP in docker cloud
40.	Updated Hosted zone in AWS Route 53