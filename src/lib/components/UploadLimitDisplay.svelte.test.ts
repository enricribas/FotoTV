import { page } from '@vitest/browser/context';
import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import UploadLimitDisplay from './UploadLimitDisplay.svelte';

describe('UploadLimitDisplay', () => {
	it('renders with basic props', async () => {
		render(UploadLimitDisplay, {
			props: {
				remaining: 5,
				limit: 10,
				canUpload: true
			}
		});

		const statusText = page.getByText('5/10');
		const remainingText = page.getByText('5 uploads remaining');

		await expect.element(statusText).toBeInTheDocument();
		await expect.element(remainingText).toBeInTheDocument();
	});

	it('shows exhausted state when no uploads remaining', async () => {
		render(UploadLimitDisplay, {
			props: {
				remaining: 0,
				limit: 10,
				canUpload: false
			}
		});

		const statusText = page.getByText('10/10');
		const exhaustedText = page.getByText('Collection upload limit reached');

		await expect.element(statusText).toBeInTheDocument();
		await expect.element(exhaustedText).toBeInTheDocument();
	});

	it('shows low state when 2 or fewer uploads remaining', async () => {
		render(UploadLimitDisplay, {
			props: {
				remaining: 2,
				limit: 10,
				canUpload: true
			}
		});

		const statusText = page.getByText('8/10');
		const lowText = page.getByText('Running low on uploads!');

		await expect.element(statusText).toBeInTheDocument();
		await expect.element(lowText).toBeInTheDocument();
	});

	it('shows normal state when sufficient uploads remaining', async () => {
		render(UploadLimitDisplay, {
			props: {
				remaining: 7,
				limit: 10,
				canUpload: true
			}
		});

		const statusText = page.getByText('3/10');
		const remainingText = page.getByText('7 uploads remaining');

		await expect.element(statusText).toBeInTheDocument();
		await expect.element(remainingText).toBeInTheDocument();
	});

	it('handles edge case with zero limit', async () => {
		render(UploadLimitDisplay, {
			props: {
				remaining: 0,
				limit: 0,
				canUpload: false
			}
		});

		const statusText = page.getByText('0/0');
		await expect.element(statusText).toBeInTheDocument();
	});
});
