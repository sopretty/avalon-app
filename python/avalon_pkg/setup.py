# -*- coding: utf-8 -*-
# authors : romain.121@hotmail.fr

"""This script allows you to build the package avalon"""

import codecs
import os
import re

from setuptools import setup, find_packages

#######################################################################################################################
#######################################################################################################################


def read(*parts):
    """This function is used to read path which are used in the function find_version"""
    here = os.path.abspath(os.path.dirname(__file__))
    with codecs.open(os.path.join(here, *parts), 'r') as fp_read:
        return fp_read.read()


def find_version(*file_paths):
    """This function is used to find the version of the package in the script __init__.py"""
    version_file = read(*file_paths)
    version_match = re.search(r"^__version__ = ['\"]([^'\"]*)['\"]", version_file, re.M)
    if version_match:
        return version_match.group(1)
    raise RuntimeError("Unable to find version string.")


#######################################################################################################################
#######################################################################################################################

if __name__ == '__main__':

    print "\n-----------------------------------------------------"
    print "--- Install package avalon"
    print "-----------------------------------------------------\n"

    setup(name="avalon",
          version=find_version("avalon", "__init__.py"),
          author='Romain Thierry-Laumont',
          author_email="Romain.121@hotmail.fr",
          classifiers=['Programming Language :: Python :: 2.7'],
          packages=find_packages(),
          package_dir={'avalon': './avalon/'},
          include_package_data=True,
          license='LICENSE.txt',
          description='Python package used in Avalon',
          long_description=open('README.md').read(),
          install_requires=['Flask', 'rethinkdb'])  # modules that are not installed by default
