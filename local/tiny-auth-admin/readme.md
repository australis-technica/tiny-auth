Windows-service: 

After install (see windows-service/readme),  
set daemon/tinyauthadmin.xml  

        	<env name="NODE_ENV" value="production"/>

and make sure .env.prod.env contains the right values.  
The start the service

