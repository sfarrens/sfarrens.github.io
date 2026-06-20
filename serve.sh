#!/usr/bin/env bash
# Local development server — uses Gemfile.dev to work around github-pages
# incompatibility with Ruby 4.0 (commonmarker requires Ruby < 4.0).
# Run: ./serve.sh
set -e

if [[ ! -f Gemfile.dev.lock ]]; then
  echo "Installing gems (first run)..."
  BUNDLE_GEMFILE=Gemfile.dev bundle install
fi

BUNDLE_GEMFILE=Gemfile.dev bundle exec jekyll serve --livereload
