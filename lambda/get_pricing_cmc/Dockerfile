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

COPY *.py /var/task

WORKDIR /var/task
CMD [ "get_pricing_cmc.lambda_handler" ]
