import { describe, it, expect } from 'vitest';
import { Timestamp } from 'firebase/firestore';
import {
	calculateUploadStatus,
	isUploadLimitLow,
	isUploadLimitExhausted,
	generateCollectionDefaults,
	sortCollectionsByDate
} from './collectionUtils';
import type { ImageCollection } from '../types/collection.types';

describe('collectionUtils', () => {
	describe('calculateUploadStatus', () => {
		it('calculates correct status for normal collection', () => {
			const collection: ImageCollection = {
				uuid: 'test-uuid',
				name: 'Test Collection',
				imageUploadLimit: 10,
				currentImageCount: 3,
				createdAt: Timestamp.now(),
				updatedAt: Timestamp.now()
			};

			const result = calculateUploadStatus(collection);

			expect(result).toEqual({
				canUpload: true,
				remaining: 7,
				limit: 10
			});
		});

		it('calculates correct status for exhausted collection', () => {
			const collection: ImageCollection = {
				uuid: 'test-uuid',
				name: 'Test Collection',
				imageUploadLimit: 5,
				currentImageCount: 5,
				createdAt: Timestamp.now(),
				updatedAt: Timestamp.now()
			};

			const result = calculateUploadStatus(collection);

			expect(result).toEqual({
				canUpload: false,
				remaining: 0,
				limit: 5
			});
		});

		it('handles edge case where current count exceeds limit', () => {
			const collection: ImageCollection = {
				uuid: 'test-uuid',
				name: 'Test Collection',
				imageUploadLimit: 5,
				currentImageCount: 7,
				createdAt: Timestamp.now(),
				updatedAt: Timestamp.now()
			};

			const result = calculateUploadStatus(collection);

			expect(result).toEqual({
				canUpload: false,
				remaining: 0,
				limit: 5
			});
		});
	});

	describe('isUploadLimitLow', () => {
		it('returns true when remaining is 2', () => {
			expect(isUploadLimitLow(2)).toBe(true);
		});

		it('returns true when remaining is 1', () => {
			expect(isUploadLimitLow(1)).toBe(true);
		});

		it('returns false when remaining is 0', () => {
			expect(isUploadLimitLow(0)).toBe(false);
		});

		it('returns false when remaining is greater than 2', () => {
			expect(isUploadLimitLow(3)).toBe(false);
		});
	});

	describe('isUploadLimitExhausted', () => {
		it('returns true when remaining is 0', () => {
			expect(isUploadLimitExhausted(0)).toBe(true);
		});

		it('returns false when remaining is greater than 0', () => {
			expect(isUploadLimitExhausted(1)).toBe(false);
		});
	});

	describe('generateCollectionDefaults', () => {
		it('generates correct default values', () => {
			const result = generateCollectionDefaults('My Photos');

			expect(result).toEqual({
				name: 'My Photos',
				imageUploadLimit: 10,
				currentImageCount: 0,
				time: 30
			});
		});
	});

	describe('sortCollectionsByDate', () => {
		it('sorts collections by creation date newest first', () => {
			const oldDate = new Timestamp(1000, 0);
			const newDate = new Timestamp(2000, 0);

			const collections: ImageCollection[] = [
				{
					uuid: 'old',
					name: 'Old Collection',
					createdAt: oldDate,
					imageUploadLimit: 10,
					currentImageCount: 0,
					updatedAt: oldDate
				},
				{
					uuid: 'new',
					name: 'New Collection',
					createdAt: newDate,
					imageUploadLimit: 10,
					currentImageCount: 0,
					updatedAt: newDate
				}
			];

			const sorted = sortCollectionsByDate(collections);

			expect(sorted[0].uuid).toBe('new');
			expect(sorted[1].uuid).toBe('old');
		});
	});
});
