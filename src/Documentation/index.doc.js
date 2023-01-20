import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';

const docrouter = Router();

const local = process.env.LOCAL_HOST;
const heroku = process.env.DB_CONNECT;

const options = {
  openapi: '3.0.1',
  info: {
    title: 'BookMe API Documentation',
    version: '1.0.0',
    description: 'This is the backend api for BookMe project.',
  },
  host: process.env.NODE_ENV === 'production' ? heroku : local,
  basePath: '/api',
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: 'setup swagger', description: 'Testing swagger setup' },
    { name: 'Admin', description: 'update user role' },
  ],
  paths: {
    '/api/v1/docs': {
      get: {
        tags: ['setup swagger'],
        description: 'testing swagger setup',
        security: [],
        parameters: [],

        responses: {
          200: {
            description: 'success status',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },

    '/api/v1/user/forgotpassword': {
      post: {
        summary: 'Forgotten password',
        tags: ['resetPassword'],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/forgot',
              },
            },
          },
          required: true,
        },
        consumes: ['application/json'],
        responses: {
          200: {
            description: 'success status',
          },
          500: {
            description: 'Something went very wrong!',
          },
        },
      },
    },
    '/api/v1/user/resetpassword/{token}': {
      patch: {
        summary: 'Reset password',
        tags: ['resetPassword'],
        parameters: [
          {
            name: 'token',
            in: 'path',
            type: 'string',
            description: 'reset token',
            required: true,
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/reset',
              },
            },
          },
          required: true,
        },
        consumes: ['application/json'],
        responses: {
          200: {
            description: 'success status',
          },
          500: {
            description: 'Error',
          },
        },
      },
    },

    '/api/v1/user/': {
      get: {
        tags: ['authentication'],
        description: 'get all user data',
        security: [],
        parameters: [],
        responses: {
          200: {
            description: 'successfully',
          },
          400: {
            description: 'Invalid credation',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/api/v1/user/{id}': {
      get: {
        tags: ['authentication'],
        description: 'get all user data',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'user id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'successfully',
          },
          400: {
            description: 'Invalid credation',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/api/v1/user/update': {
      patch: {
        tags: ['authentication'],
        description: 'update user data',
        parameters: [],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/User',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          400: {
            description: 'Invalid credation',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },
    '/api/v1/user/roles': {
      put: {
        tags: ['Admin'],
        description: 'Updating user roles',
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/userRole',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'success',
          },
          500: {
            description: 'Internal server error',
          },
        },
      },
    },
    '/api/v1/user/notification/get': {
      get: {
        tags: ['Notification'],
        description: 'Get all notifications',
        parameters: [],
        responses: {
          200: {
            description: 'success',
          },
        },
      },
    },
    '/api/v1/user/notification/read': {
      put: {
        tags: ['Notification'],
        description: 'Read all notifications',
        parameters: [],
        responses: {
          200: {
            description: 'success',
          },
        },
      },
    },
    '/api/v1/user/notification/{id}': {
      patch: {
        tags: ['Notification'],
        description: 'Read notification',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'notification id',
            required: true,
            schema: {
              type: 'string',
            },
          },
        ],
        responses: {
          200: {
            description: 'success',
          },
        },
      },
    },
    '/api/v1/user/auth/signup': {
      post: {
        security: [],
        tags: ['authentication'],
        description: 'user signup with JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignupAuthShema',
              },
              example: {
                firstName: 'alain',
                lastName: 'tresor',
                username: 'alain',
                phoneNumber: '0785632478',
                role: 'admin',
                gender: 'male',
                email: 'tresoralain35@gmail.com',
                password: 'testing',
                repeat_password: 'testing',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'success status',
          },
        },
      },
    },
    '/api/v1/user/login': {
      post: {
        tags: ['authentication'],
        description: 'login user',
        security: [],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                email: 'tresoralain35@gmail.com',
                password: 'testing',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          400: {
            description: 'Invalid credation',
          },
          500: {
            description: 'Internal Server Error',
          },
        },
      },
    },

    '/api/v1/user/auth/logout': {
      get: {
        tags: ['authentication'],
        description: 'logout user',
        responses: {
          200: {
            description: 'successfully',
          },
        },
      },
    },
    '/api/v1/accomodation': {
      post: {
        tags: ['Accomodation'],
        summary: 'Adding accomodation facility',
        description: 'accomodation management of facility operation',
        operationId: 'ADD_ACCOMODATION',
        consumes: ['multipart/form-data'],
        parameters: [],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/accomodation',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'New Accomodation have been created',
          },
        },
      },
      get: {
        tags: ['Accomodation'],
        summary: 'Get all accomodation',
        description: 'list of all accomodation',
        OperationId: 'List of all accomodation',
        responses: {
          200: {
            description: 'Retrieved',
          },
        },
      },
    },

    '/api/v1/accomodation/{id}': {
      get: {
        tags: ['Accomodation'],
        summary: 'Fetch single accomodation',
        description: 'Fetch single accomodation',
        operationId: 'Fetch accomodation',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'accomodation Id',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'a single accomodation received successfully',
          },
        },
      },
      put: {
        tags: ['Accomodation'],
        summary: 'update accomodation',
        description: 'update accomodation',
        operationId: 'update accomodation',

        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            taken: 'string',
            description: 'Accomodation Id',
            required: true,
          },
        ],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/accomodation',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'Accomodation Updated Successfully',
          },
        },
      },
      delete: {
        tags: ['Accomodation'],
        summary: 'Delete an Accomodation',
        description: 'Delete an Accomodation',
        OperationId: 'Delete an Accomodation',

        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'Accomodation Id',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Accomodation deleted successful',
          },
          404: {
            description: 'Not Found',
          },
        },
      },
    },
    '/api/v1/rooms/{accomodationId}': {
      post: {
        tags: ['room'],
        summary: 'Creating user using Accomodation id',
        description:
          'You have to create a room according to the facility you have where you use accomodation id',
        parameters: [
          {
            name: 'accomodationId',
            in: 'path',
            type: 'string',
            description: 'Accomodation Id',
            required: true,
          },
        ],
        consumes: ['multipart/form-data'],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                $ref: '#/components/schemas/rooms',
              },
            },
          },
          required: true,
        },

        responses: {
          200: {
            description: 'Room was successfully created',
          },
        },
      },
    },
    '/api/v1/rooms': {
      get: {
        tags: ['room'],
        summary: 'Get all rooms',
        description: 'list of all rooms',
        OperationId: 'List of all rooms',
        responses: {
          200: {
            description: 'received all rooms',
          },
        },
      },
    },
    '/api/v1/rooms/{id}': {
      get: {
        tags: ['room'],
        summary: 'Fetch a single room',
        description: 'Fetch a single room',
        operationId: 'Fetch a single room',
        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'room id',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'a single room received successfully',
          },
        },
      },
      put: {
        tags: ['room'],
        summary: 'update room with room id',
        description: 'update room found',
        operationId: 'update accomodation ',

        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'room Id',
            required: true,
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/rooms',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'Room Updated Successfully',
          },
        },
      },
      delete: {
        tags: ['room'],
        summary: 'Delete a room',
        description: 'Delete an room',
        OperationId: 'Delete an room',

        produces: ['application/json'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            type: 'string',
            description: 'Room ID',
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Room deleted successful',
          },
          404: {
            description: 'Not Found',
          },
        },
      },
    },
    '/api/v1/book': {
      post: {
        tags: ['booking'],
        summary: 'Booking room',
        // description:
        //   'You have to create a room according to the facility you have where you use accomodation id',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/book',
              },
            },
          },
          required: true,
        },

        responses: {
          200: {
            description: 'Room was successfully created',
          },
        },
      },
    },
    '/api/v1/event': {
      post: {
        tags: ['Event'],
        summary: 'create event',
        // description:
        //   'You have to create a room according to the facility you have where you use accomodation id',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/event',
              },
            },
          },
          required: true,
        },

        responses: {
          200: {
            description: 'Event was successfully created',
          },
        },
      },
      get: {
        tags: ['Event'],
        summary: 'Fetch all event',
        parameters: [
        ],
        responses: {
          200: {
            description: 'events received successfully',
          },
        },
      },
    },
    '/api/v1/search': {
      post: {
        tags: ['Search'],
        summary: 'Search accomodations',
        parameters: [
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/search',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'accomodations received successfully',
          },
        },
      },
    },
    '/api/v1/payment/pay': {
      post: {
        tags: ['Payment'],
        summary: 'Saving Payment information',
        parameters: [
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/payment',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'accomodations received successfully',
          },
        },
      },
    }
  },
  components: {
    schemas: {
      userRole: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'user email',
          },
          role: {
            type: 'string',
            description: 'new role to set to user',
          },
        },
      },
      SignupAuthShema: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
          },
          firstName: {
            type: 'string',
          },
          lastName: {
            type: 'string',
          },
          phoneNumber: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          repeat_password: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
        },
      },
      User: {
        type: 'object',

        properties: {
          firstName: {
            type: 'string',
            description: 'new role to set to user',
          },
          lastName: {
            type: 'string',
            description: "User's fullname",
          },
          username: {
            type: 'string',
            description: "User's fullname",
          },
          email: {
            type: 'string',
            description: "User's email",
          },
          phoneNumber: {
            type: 'string',
            description: "User's phone number",
          },
          image: {
            type: 'string',
            description: "User's image url",
            format: 'binary',
          },
          gender: {
            type: 'string',
            description: "User's gender",
          },
          preferredLanguage: {
            type: 'string',
            description: "User's preferred language",
          },
          preferredCurrency: {
            type: 'string',
            description: "User's preferred currency",
          },
          department: {
            type: 'string',
            description: "User's department",
          },
          lineManager: {
            type: 'string',
            description: "User's line manager",
          },
        },
      },
      book: {
        type: 'object',

        properties: {
          fname: {
            type: 'string',
          },
          lname: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          country: {
            type: 'string',
          },
          phone: {
            type: 'string',
          },
          bookingForName: {
            type: 'string',
          },
          bookingForEmail: {
            type: 'string',
          },
          purpose: {
            type: 'string',

          },
          question: {
            type: 'string',
          },
          arriveTime: {
            type: 'string',
          },
          arriveDate: {
            type: 'string',
          },
          accomodationId: {
            type: 'string',
          },
          eventId: {
            type: 'string',
            description: "event's id",
          },
          roomType: {
            type: 'string',
            description: "room's type",
          },
          dayNumber: {
            type: 'string',
            description: "Number of days to stay",
          },
          roomNumber: {
            type: 'string',
            description: "Number of room ",
          },
          paymentMethod: {
            type: 'string',
          },
        },
      },
      payment: {
        type: 'object',

        properties: {
          roomId: {
            type: 'string',
          },
          bookId: {
            type: 'string',
          },
          orderNo: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          roomNumber: {
            type: 'string',
          },
          amount: {
            type: 'string',
          },
          status: {
            type: 'string',
          },
        },
      },
      search: {
        type: 'object',

        properties: {
          location: {
            type: 'string',
            description: "accomodation's location",
          },
          children: {
            type: 'string',
            description: "number of childer in room",
          },
          adults: {
            type: 'string',
            description: "number of adults in room",
          },
          roomsNber: {
            type: 'string',
            description: "number of available rooms",
          },
        }
      },
      event: {
        type: 'object',

        properties: {
          name: {
            type: 'string',
            description: "event's name",
          },
          date: {
            type: 'string',
            description: "event's date",
          },
          time: {
            type: 'string',
            description: "time's event",
          },
          location: {
            type: 'string',
            description: "location of event",
          },
          hoster: {
            type: 'string',
            description: "event hoster name ",
          },
        },
      },
      rooms: {
        type: 'object',
        properties: {
          roomType: {
            name: 'roomType',
            in: 'formData',
            type: 'string',
          },
          roomCost: {
            name: 'roomCost',
            in: 'formData',
            type: 'string',
          },
          availableRooms: {
            name: 'availableRooms',
            in: 'formData',
            type: 'string',
          },
          children: {
            name: 'children',
            in: 'formData',
            type: 'string',
          },
          adults: {
            name: 'children',
            in: 'formData',
            type: 'string',
          },
          facilities: {
            name: 'facilities',
            in: 'formData',
            type: 'array',
            items: {
              type: 'string',
            },
          },
          image: {
            name: 'image',
            in: 'formData',
            type: 'file',
          },
        },
      },

      accomodation: {
        type: 'object',
        content: 'multipart/form-data',
        properties: {
          name: {
            name: 'name',
            in: 'formData',
            type: 'string',
          },
          description: {
            name: 'description',
            in: 'formData',
            type: 'string',
          },
          location: {
            name: 'location',
            in: 'formData',
            type: 'string',
          },
          image: {
            name: 'image',
            in: 'formData',
            type: 'file',
          },
          highlight: {
            name: 'highlight',
            in: 'formData',
            type: 'string',
          },
          amenitiesList: {
            name: 'amenitiesList',
            in: 'formData',
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
      },
      forgot: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
          },
        },
      },
      reset: {
        type: 'object',
        properties: {
          password: {
            type: 'string',
            in: 'body',
            name: 'name',
            required: true,
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
docrouter.use('/', serve, setup(options));
export default docrouter;
