FROM public.ecr.aws/lambda/python:3.9

RUN mkdir -p /var/task
WORKDIR /var/task

COPY requirements.txt /var/task

# Yum update
RUN yum -y update

# Install components
RUN yum install -y gcc-c++ make util-linux less telnet yum-utils tar
RUN yum -y install awscli

RUN pip install -r /var/task/requirements.txt

RUN mkdir -p /var/task/modules /var/task/templates
COPY *.py /var/task
COPY *.json /var/task
COPY modules /var/task/modules
COPY templates /var/task/templates

WORKDIR /var/task
CMD [ "send_alerts_compound.lambda_handler" ]
