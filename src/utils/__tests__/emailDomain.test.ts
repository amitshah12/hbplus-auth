import { describe, expect, it } from '@jest/globals';
import { isAllowedEmail } from '../emailDomain';

describe('isAllowedEmail', () => {
  it('allows an official @hbplus.fit email', () => {
    expect(isAllowedEmail('employee@hbplus.fit')).toBe(true);
  });

  it('rejects a personal Gmail address', () => {
    expect(isAllowedEmail('user@gmail.com')).toBe(false);
  });

  it('rejects a lookalike domain', () => {
    expect(isAllowedEmail('user@hbplus.fit.example.com')).toBe(false);
  });

  it('accepts the official domain regardless of letter case', () => {
    expect(isAllowedEmail('user@HBPLUS.FIT')).toBe(true);
  });

  it('rejects an email from a subdomain', () => {
    expect(isAllowedEmail('user@sub.hbplus.fit')).toBe(false);
  });

  it('rejects an email with no address before @', () => {
    expect(isAllowedEmail('@hbplus.fit')).toBe(false);
  });

  it('rejects an email with no domain', () => {
    expect(isAllowedEmail('employee@')).toBe(false);
  });

  it('rejects an empty email', () => {
    expect(isAllowedEmail('')).toBe(false);
  });

  it('rejects null or undefined email values', () => {
    expect(isAllowedEmail(null)).toBe(false);
    expect(isAllowedEmail(undefined)).toBe(false);
  });

  it('allows surrounding whitespace to be trimmed', () => {
    expect(isAllowedEmail(' employee@hbplus.fit ')).toBe(true);
  });
});