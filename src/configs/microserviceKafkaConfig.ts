import { KafkaOptions, Transport } from '@nestjs/microservices';

export const MicroserviceKafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,

  options: {
    client: {
      brokers: ['127.0.0.1:29092'],
    },
    consumer: {
      groupId: '1',
      allowAutoTopicCreation: true,
    },
  },
};
