const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: 'Untitled CV',
    },
    template: {
      type: String,
      enum: ['modern', 'corporate', 'minimal', 'ats'],
      default: 'modern',
    },
    personalInfo: {
      fullName: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      address: { type: String, default: '' },
      city: { type: String, default: '' },
      nationality: { type: String, default: '' },
      visaStatus: { type: String, default: '' },
      dateOfBirth: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      website: { type: String, default: '' },
      photoURL: { type: String, default: '' },
    },
    careerObjective: {
      type: String,
      default: '',
    },
    experience: [
      {
        jobTitle: { type: String, default: '' },
        company: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        description: { type: String, default: '' },
      },
    ],
    education: [
      {
        degree: { type: String, default: '' },
        institution: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        gpa: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    ],
    skills: [
      {
        name: { type: String, default: '' },
        level: {
          type: String,
          enum: ['beginner', 'intermediate', 'advanced', 'expert', ''],
          default: '',
        },
      },
    ],
    certifications: [
      {
        name: { type: String, default: '' },
        issuer: { type: String, default: '' },
        date: { type: String, default: '' },
        expiryDate: { type: String, default: '' },
        credentialId: { type: String, default: '' },
      },
    ],
    languages: [
      {
        name: { type: String, default: '' },
        proficiency: {
          type: String,
          enum: ['basic', 'conversational', 'proficient', 'fluent', 'native', ''],
          default: '',
        },
      },
    ],
    projects: [
      {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        technologies: { type: String, default: '' },
        link: { type: String, default: '' },
      },
    ],
    references: [
      {
        name: { type: String, default: '' },
        position: { type: String, default: '' },
        company: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CV', cvSchema);
